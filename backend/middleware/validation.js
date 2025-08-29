
function validateInitiatePayment(req, res, next) {
  const { amount, email, phone } = req.body || {};

  if (amount === undefined || amount === null) {
    return res.status(400).json({ error: 'Amount is required' });
  }
  if (!Number.isInteger(amount)) {
    return res.status(400).json({ error: 'Amount must be an integer' });
  }
  if (amount < 100) {
    return res.status(400).json({ error: 'Amount cannot be less than 100 XAF' });
  }

  // Optional email validation
  if (email !== undefined) {
    if (typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json({ error: 'Email, when provided, must be a non-empty string' });
    }
    const basicEmailRegex = /^\S+@\S+\.[\S]{2,}$/;
    if (!basicEmailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
  }

  // Optional phone validation (accepts + and digits, length 8-15 digits)
  if (phone !== undefined) {
    if (typeof phone !== 'string' || phone.trim() === '') {
      return res.status(400).json({ error: 'Phone, when provided, must be a non-empty string' });
    }
    const phoneDigits = phone.replace(/\s|-/g, '');
    const basicPhoneRegex = /^\+?\d{8,15}$/;
    if (!basicPhoneRegex.test(phoneDigits)) {
      return res.status(400).json({ error: 'Invalid phone format. Use digits with optional leading +' });
    }
  }

  // Note: 'medium' intentionally not supported

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
