const axios = require('axios');

// Temporary in-memory transaction store
let transactions = [];

async function callFapshiInitiate(data) {
  try {
    const response = await axios.post(
      `${process.env.FAPSHI_BASE_URL}/direct-pay`,
      data,
      {
        headers: {
          apikey: process.env.FAPSHI_CLIENT_ID,
          apiuser: process.env.FAPSHI_APIUSER,
          'Content-Type': 'application/json',
        },
      }
    );

    // Store the transaction in memory
    transactions.push({
      transactionId: response.data.transactionId || response.data.transId,
      data: response.data,
      status: 'PENDING',
      createdAt: new Date()
    });

    return response.data;
  } catch (error) {
    console.error('🔴 Fapshi API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Direct pay initiation failed');
  }
}

async function callFapshiGetStatus(transId) {
  try {
    if (!transId || typeof transId !== 'string') {
      throw new Error('Invalid type, string expected');
    }
    if (!/^[a-zA-Z0-9]{8,50}$/.test(transId)) {
      throw new Error('Invalid transaction ID format');
    }

    const response = await axios.get(
      `${process.env.FAPSHI_BASE_URL}/payment-status/${transId}`,
      {
        headers: {
          apikey: process.env.FAPSHI_CLIENT_ID,
          apiuser: process.env.FAPSHI_APIUSER,
          'Content-Type': 'application/json',
        },
      }
    );

    // Update status in memory
    transactions = transactions.map(t =>
      t.transactionId === transId ? { ...t, status: response.data.status } : t
    );

    return { ...response.data, statusCode: response.status };
  } catch (error) {
    console.error('🔴 Fapshi API getStatus error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to get payment status');
  }
}

function getAllTransactions() {
  return transactions;
}

module.exports = {
  callFapshiInitiate,
  callFapshiGetStatus,
  getAllTransactions
};
