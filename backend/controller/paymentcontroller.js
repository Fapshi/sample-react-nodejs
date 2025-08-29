const axios = require('axios');
require('dotenv').config();

// Fapshi API configuration
const fapshiConfig = require('../config/fapshi.config');
// Models
const Payment = require('../models/Payment');

// Helper function to create error response
const createError = (message, status = 500) => ({
  success: false,
  error: message,
  status
});

// Initiate payment
const initiatePayment = async (req, res) => {
  try {
    const { amount, redirectUrl, email, phone } = req.body;

    // Input validation
    if (!amount) return res.status(400).json({ error: 'Amount is required' });
    if (!Number.isInteger(amount)) return res.status(400).json({ error: 'Amount must be an integer' });
    if (amount < 100) return res.status(400).json({ error: 'Amount cannot be less than 100 XAF' });
    
    // Prepare payment payload
    const paymentPayload = { amount };
    if (redirectUrl) {
      paymentPayload.redirectUrl = redirectUrl;
    }
    if (email) {
      paymentPayload.email = email;
    }
    if (phone) {
      paymentPayload.phone = phone;
    }
    // Note: 'medium' intentionally not supported
    
    const response = await axios.post(
      `${fapshiConfig.baseUrl}/initiate-pay`,
      paymentPayload,
      {
        headers: fapshiConfig.headers,
        timeout: fapshiConfig.timeout
      }
    );
    
    // Create a new response with our custom message
    const paymentResponse = {
      ...response.data,  // Include all original response data from Fapshi
      message: 'Payment successful',
      // Echo back client-provided values for frontend Success page
      amount,
      email: email || response.data?.email || undefined,
      phone: phone || response.data?.phone || undefined
    };
    
    // Return our custom response
    res.json(paymentResponse);

    // Persist payment (fire-and-forget)
    try {
      await Payment.create({
        transId: paymentResponse.transId || paymentResponse.transactionId,
        amount,
        email: paymentResponse.email,
        phone: paymentResponse.phone,
        redirectUrl: paymentResponse.redirectUrl,
        link: paymentResponse.link || paymentResponse.paymentLink || paymentResponse.url,
        status: paymentResponse.status || 'pending',
        serviceName: paymentResponse.serviceName,
        transType: paymentResponse.transType,
        dateInitiated: paymentResponse.dateInitiated ? new Date(paymentResponse.dateInitiated) : new Date(),
        externalId: paymentResponse.externalId,
        userId: undefined,
        financialTransId: paymentResponse.financialTransId,
        gatewayResponse: paymentResponse
      });
    } catch (dbErr) {
      console.error('DB create payment error:', dbErr.message);
    }

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
    
    if (!transactionId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Transaction ID is required' 
      });
    }

    const response = await axios.get(
      `${fapshiConfig.baseUrl}/payment-status/${transactionId}`,
      {
        headers: fapshiConfig.headers,
        timeout: fapshiConfig.timeout
      }
    );

    const {
      transId,
      status,
      medium,
      serviceName,
      transType,
      amount,
      email,
      redirectUrl,
      externalId,
      userId,
      financialTransId,
      dateInitiated,
      dateConfirmed
    } = response.data;

    res.json({
      success: true,
      transId,
      status,
      medium,
      serviceName,
      transType,
      amount,
      email,
      redirectUrl,
      externalId,
      userId,
      financialTransId,
      dateInitiated,
      dateConfirmed
    });

    // Update persisted payment (fire-and-forget)
    try {
      await Payment.updateOne(
        { transId: transId },
        {
          $set: {
            status,
            serviceName,
            transType,
            amount,
            email,
            redirectUrl,
            externalId,
            userId,
            financialTransId,
            dateInitiated: dateInitiated ? new Date(dateInitiated) : undefined,
            dateConfirmed: dateConfirmed ? new Date(dateConfirmed) : undefined,
            lastStatusPayload: response.data
          }
        },
        { upsert: false }
      );
    } catch (dbErr) {
      console.error('DB update payment error:', dbErr.message);
    }

  } catch (error) {
    console.error('Payment status error:', error.response?.data || error.message);
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