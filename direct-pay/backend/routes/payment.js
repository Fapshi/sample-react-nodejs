const express = require('express');
const router = express.Router();
const { directPay } = require('../controllers/paymentController');

router.post('/direct-pay', directPay);

module.exports = router;
