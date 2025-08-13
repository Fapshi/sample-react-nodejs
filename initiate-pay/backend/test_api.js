const axios = require('axios');

// This should match the port your server is running on
const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;

async function testPayment() {
  try {
    const amount = 500; // Define the amount here
    console.log('Testing payment initiation...');
    
    // Test payment initiation through our local endpoint
    const response = await axios.post(
      `${BASE_URL}/api/payment/initiate`,
      { 
        amount: amount,
        userId: 'test_user_123' // Required userId
      },
      {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );
    
    // Log full response for debugging
    console.log('\n=== Full Response ===');
    console.log(JSON.stringify(response.data, null, 2));
    
    // Show amount and payment link in a clean format
    console.log(`\n${amount} XAF`);
    console.log(`${response.data.link || response.data.paymentLink || 'No payment link'}`);
    console.log(`Status: ${response.data.message || 'No status'}\n`);

  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

testPayment();
