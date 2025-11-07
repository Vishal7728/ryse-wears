const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getPaymentDetails,
} = require('../controllers/paymentController');
const { handleRazorpayWebhook } = require('../controllers/webhookController');

router.post('/create-order', createOrder);

router.post('/verify', verifyPayment);

router.get('/:paymentId', getPaymentDetails);

router.post('/webhook', handleRazorpayWebhook);

module.exports = router;
