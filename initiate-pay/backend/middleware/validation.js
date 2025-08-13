
function validateInitiatePayment(req, res, next) {
  const { amount } = req.body || {};

  if (amount === undefined || amount === null) {
    return res.status(400).json({ error: 'Amount is required' });
  }
  if (!Number.isInteger(amount)) {
    return res.status(400).json({ error: 'Amount must be an integer' });
  }
  if (amount < 100) {
    return res.status(400).json({ error: 'Amount cannot be less than 100 XAF' });
  }

  next();
}

// Validate param for checking a payment status
function validateTransactionId(req, res, next) {
  const { transactionId } = req.params || {};
  if (!transactionId || typeof transactionId !== 'string' || transactionId.trim() === '') {
    return res.status(400).json({ success: false, error: 'Transaction ID is required' });
  }
  next();
}

module.exports = {
  validateInitiatePayment,
  validateTransactionId,
};
