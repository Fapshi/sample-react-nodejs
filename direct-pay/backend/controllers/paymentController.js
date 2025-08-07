const { callFapshiInitiate, callFapshiConfirm } = require('../services/fapshiService');

exports.initiatePayment = async (req, res) => {
  try {
    const { amount, currency, customer } = req.body;
    const response = await callFapshiInitiate(amount, currency, customer);
    res.status(200).json(response);
  } catch (error) {
    console.error(error?.response?.data || error);
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
};

exports.confirmPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const response = await callFapshiConfirm(transactionId);

    // Assume the Fapshi confirm response gives something like:
    // { status: "SUCCESSFUL", amount: 180, currency: "XAF", customer: "+237...", description: "...", timestamp: "..." }

    // Compose the data your frontend needs:
    const paymentInfo = {
      status: response.status || 'SUCCESSFUL',  // fallback if API doesn't return
      transactionId: response.transactionId || transactionId,
      amount: `${response.currency || 'XAF'} ${response.amount}`,
      phoneNumber: response.customer,
      description: response.description || 'Business',
      date: new Date().toLocaleString('en-US', { timeZone: 'Africa/Douala' }),  // you can replace with server time or API timestamp
    };

    res.status(200).json(paymentInfo);
  } catch (error) {
    console.error(error?.response?.data || error);
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
};

