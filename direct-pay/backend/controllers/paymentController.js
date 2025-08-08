const { callFapshiInitiate } = require('../services/fapshiService');

exports.directPay = async (req, res) => {
  console.log('🟢 Direct Pay called with:', req.body);
  try {
    const {
      amount,
      phone,
      name,
      email,
      medium = 'mobile money',
      userId = 'guest_user',
      externalId = `txn_${Date.now()}`,
      message = 'Payment from Ghost',
    } = req.body;

    if (!amount || !phone || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields: amount, phone, name, email' });
    }

    const data = {
      amount,
      phone,
      name,
      email,
      medium,
      userId,
      externalId,
      message,
    };

    const response = await callFapshiInitiate(data);

    const result = {
      transactionId: response.transId,
      phone,
      amount,
      dateInitiated: response.dateInitiated,
    };

    console.log('✅ Direct Pay response:', result);

    res.status(200).json(result);
  } catch (error) {
    console.error('❌ Direct Pay error:', error.message);
    res.status(500).json({ error: 'Failed to initiate direct pay' });
  }
};
