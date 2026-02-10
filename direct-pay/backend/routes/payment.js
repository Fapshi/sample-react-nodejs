const express = require('express');
const router = express.Router();

const { directPay, getPaymentStatus } = require('../controllers/paymentController');
const validateDirectPayRequest = require('../middlewares/validatePaymentRequest');

// POST /api/payment/direct-pay
router.post('/direct-pay', validateDirectPayRequest, directPay);

// GET /api/payment/payment-status/:transId
router.get('/payment-status/:transId', getPaymentStatus);

module.exports = router;
