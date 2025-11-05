const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getPaymentDetails,
} = require('../controllers/paymentController');
const { handleRazorpayWebhook } = require('../controllers/webhookController');

// POST /api/payment/create-order
router.post('/create-order', createOrder);

// POST /api/payment/verify
router.post('/verify', verifyPayment);

// GET /api/payment/:paymentId
router.get('/:paymentId', getPaymentDetails);

// POST /api/payment/webhook - Razorpay webhook endpoint
router.post('/webhook', handleRazorpayWebhook);

module.exports = router;
