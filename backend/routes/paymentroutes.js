const express = require('express');
const router = express.Router();
const { initiatePayment, getPaymentStatus } = require('../controller/paymentcontroller');

// Initiate a new payment
// POST /api/payment/initiate
// Body: { amount: number, email?: string, userId?: string, externalId?: string, redirectUrl?: string, message?: string }
router.post('/initiate', initiatePayment);

// Get payment status
// GET /api/payment/status/:transactionId
router.get('/status/:transactionId', getPaymentStatus);

module.exports = router;
