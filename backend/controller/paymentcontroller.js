const axios = require('axios');
const { baseUrl, headers, timeout } = require('../config/fapshi.config');

// Initiate payment
const initiatePayment = async (req, res) => {
  try {
    const { amount } = req.body;
    const response = await axios.post(
      `${baseUrl}/initiate-pay`,
      { amount },
      { 
        headers,
        timeout
      }
    );
    // Return upstream response as-is for simplicity
    res.json(response.data);

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
    // Return compact payload with success flag
    res.json({ success: true, ...response.data });

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
