const axios = require('axios');
require('dotenv').config();

// Fapshi API configuration - Using Sandbox
const baseUrl = 'https://sandbox.fapshi.com';

// Helper function to create error response
const createError = (message, status = 500) => ({
  success: false,
  error: message,
  status
});

// Initiate payment
const initiatePayment = async (req, res) => {
  try {
    const { amount } = req.body;

    // Input validation
    if (!amount) return res.status(400).json({ error: 'Amount is required' });
    if (!Number.isInteger(amount)) return res.status(400).json({ error: 'Amount must be an integer' });
    if (amount < 100) return res.status(400).json({ error: 'Amount cannot be less than 100 XAF' });
    
    const response = await axios.post(
      `${baseUrl}/initiate-pay`,
      { amount },
      { 
        headers: {
          'Content-Type': 'application/json',
          'apiuser': '31189c1e-6241-4b1f-8a52-63edbac297c1',
          'apikey': 'FAK_TEST_481b28d80c3f61ec54ca'
        },
        timeout: 10000
      }
    );
    
    // Log the full Fapshi response in the server terminal
    console.log('\nPayment processed successfully:');
    
    // Create a new response with our custom message
    const paymentResponse = {
      ...response.data,  // Include all original response data
      message: 'Payment successful'  // Override the message
    };
    
    console.log(JSON.stringify(paymentResponse, null, 2) + '\n');
    
    // Return our custom response
    res.json(paymentResponse);

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
      `${baseUrl}/payment-status/${transactionId}`,
      { 
        headers,
        timeout: 10000
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
