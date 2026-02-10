// middlewares/validateDirectPayRequest.js

module.exports = (req, res, next) => {
  const {
    amount,
    phone,
    name,
    email,
    medium,
    userId,
    externalId,
    message
  } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Amount is required and must be a positive number." });
  }

  if (!phone || typeof phone !== 'string') {
    return res.status(400).json({ error: "Phone is required and must be a string." });
  }

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: "Name is required and must be a string." });
  }

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: "Email is required and must be a string." });
  }

 

  next();
};
