const express = require('express');
const router = express.Router();
const { initiatePayment, getPaymentStatus } = require('../controller/paymentcontroller');
const { validateInitiatePayment, validateTransactionId } = require('../middleware/validation');
router.post('/initiate', validateInitiatePayment, initiatePayment);
router.get('/status/:transactionId', validateTransactionId, getPaymentStatus);
module.exports = router;