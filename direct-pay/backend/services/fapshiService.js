const axios = require('axios');

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
    return response.data;
  } catch (error) {
    console.error('🔴 Fapshi API error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Direct pay initiation failed');
  }
}

module.exports = { callFapshiInitiate };
