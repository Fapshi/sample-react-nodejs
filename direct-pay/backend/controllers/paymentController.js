const { callFapshiInitiate, callFapshiGetStatus } = require('../services/fapshiService');
const { prepareDirectPayData } = require('../helpers/paymentData');

// Temporary in-memory store
const transactions = [];

exports.directPay = async (req, res) => {
  console.log('🟢 Direct Pay called with:', req.body);

  try {
    const data = prepareDirectPayData(req.body);
    const response = await callFapshiInitiate(data);

    const transaction = {
      transactionId: response.transId,
      phone: data.phone,
      amount: data.amount,
      dateInitiated: response.dateInitiated,
      status: 'PENDING'
    };

    // Store transaction in memory
    transactions.push(transaction);

    console.log('✅ Direct Pay response:', transaction);
    res.status(200).json(transaction);
  } catch (error) {
    console.error('❌ Direct Pay error:', error.message);
    res.status(500).json({ error: 'Failed to initiate direct pay' });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const { transId } = req.params;
    if (!transId) {
      return res.status(400).json({ error: "Transaction ID (transId) is required" });
    }

    // Find in local store first
    let transaction = transactions.find(t => t.transactionId === transId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Call Fapshi API for real status
    const fapshiStatus = await callFapshiGetStatus(transId);

      console.log('Payment Status Response:', fapshiStatus);

    // Update local transaction status with API result
    transaction.status = fapshiStatus.status || transaction.status;
    transaction.dateConfirmed = fapshiStatus.dateConfirmed || transaction.dateConfirmed;

    res.status(200).json(transaction);
  } catch (error) {
    console.error('❌ Get Payment Status error:', error.message);
    res.status(500).json({ error: 'Failed to get payment status' });
  }
};
