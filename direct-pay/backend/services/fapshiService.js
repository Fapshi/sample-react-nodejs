const axios = require('axios');

exports.callFapshiInitiate = async (amount, currency, customer) => {
  // Prepare data according to Fapshi API requirements
  const data = {
    amount,                     // integer, minimum 100
    phone: customer.phone,      // required
    medium: 'mobile money',     // optional, you can omit or adjust
    name: customer.name || '',  // optional
    email: customer.email || '',// optional
  };

  const res = await axios.post(
    `${process.env.FAPSHI_BASE_URL}/direct-pay`,
    data,
    {
      headers: {
        'apikey': process.env.FAPSHI_CLIENT_ID,
        'apiuser': process.env.FAPSHI_CLIENT_ID,
        'Content-Type': 'application/json',
      },
    }
  );

  return res.data;
};

exports.callFapshiConfirm = async (transactionId) => {
  // Assuming your previous confirm method or use GET status endpoint if exists
  // Fapshi docs mention GET transaction status, example:
  const res = await axios.get(
    `${process.env.FAPSHI_BASE_URL}/transactions/${transactionId}`,
    {
      headers: {
        'apikey': process.env.FAPSHI_CLIENT_ID,
        'apiuser': process.env.FAPSHI_CLIENT_ID,
      },
    }
  );

  const data = res.data;

  // Map the data to your expected return format
  return {
    status: data.status || 'SUCCESSFUL',
    transactionId: transactionId,
    amount: `${data.currency || 'XAF'} ${data.amount}`,
    phoneNumber: data.phone,
    description: data.message || 'Business',
    date: data.dateInitiated || new Date().toLocaleString('en-US', { timeZone: 'Africa/Douala' }),
  };
};
