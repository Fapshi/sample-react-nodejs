const axios = require('axios');
const { baseUrl, headers, timeout } = require('../config/fapshi.config');

// In-memory store to remember client-provided redirect URLs per transaction
// Note: for production, persist this in a DB or include the URL on the frontend side.
const redirectStore = new Map();

// Initiate payment
const initiatePayment = async (req, res) => {
  try {
    const {
      amount,
      email,
      userId,
      externalId,
      message,
      // optional redirect hints from client (we DO NOT forward to Fapshi, just store locally)
      redirectUrl,
      redirect_url,
      redirectURL,
      returnUrl,
      return_url,
      callbackUrl,
      callback_url,
    } = req.body;
    const payload = { amount };
    if (email) payload.email = email;
    if (userId) payload.userId = userId;
    if (externalId) payload.externalId = externalId;
    if (message) payload.message = message;
    const response = await axios.post(
      `${baseUrl}/initiate-pay`,
      payload,
      { 
        headers,
        timeout
      }
    );
    // If client provided a redirect URL, store it by transaction ID for later use
    const redirectValue = redirectUrl || redirect_url || redirectURL || returnUrl || return_url || callbackUrl || callback_url;
    const transId = response.data?.transId || response.data?.transactionId;
    if (redirectValue && transId) {
      redirectStore.set(String(transId), String(redirectValue));
    }
    // Return upstream response and echo redirectUrl if provided
    res.json({ ...response.data, redirectUrl: redirectValue || null });

  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to initiate payment';
    res.status(status).json({ error: message });
  }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const response = await axios.get(
      `${baseUrl}/payment-status/${transactionId}`,
      { 
        headers,
        timeout
      }
    );
    // Build optional success redirect URL if payment succeeded
    const data = response.data || {};
    const status = data.status || data.paymentStatus || data.state;
    const transId = String(data.transId || data.transactionId || transactionId);
    // Prefer client-provided redirect for this transaction, then env fallback
    const clientProvided = redirectStore.get(transId);
    const baseSuccess = clientProvided || process.env.SUCCESS_REDIRECT_URL || process.env.CLIENT_SUCCESS_URL || 'http://localhost:5173/payment-success';
    const isSuccess = typeof status === 'string' && ['SUCCESS','COMPLETED','CONFIRMED','PAID','SUCCESSFUL'].includes(status.toUpperCase());

    const payload = { success: true, ...data };
    if (isSuccess && baseSuccess) {
      const url = new URL(baseSuccess);
      if (transId) url.searchParams.set('transId', String(transId));
      payload.successRedirectUrl = url.toString();
    }
    res.json(payload);

  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Failed to get payment status';
    res.status(status).json({
      success: false,
      error: message
    });
  }
};

module.exports = {
  initiatePayment,
  getPaymentStatus
};
