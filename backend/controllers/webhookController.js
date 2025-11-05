const crypto = require('crypto');

// Razorpay webhook handler
const handleRazorpayWebhook = async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    // Verify webhook signature
    if (webhookSecret) {
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (signature !== expectedSignature) {
        return res.status(400).json({
          success: false,
          message: 'Invalid webhook signature',
        });
      }
    }

    const event = req.body.event;
    const payload = req.body.payload;

    console.log('Webhook Event:', event);
    console.log('Webhook Payload:', payload);

    // Handle different webhook events
    switch (event) {
      case 'payment.authorized':
        console.log('Payment authorized:', payload.payment.entity.id);
        break;

      case 'payment.captured':
        console.log('Payment captured:', payload.payment.entity.id);
        // Update order status in database
        break;

      case 'payment.failed':
        console.log('Payment failed:', payload.payment.entity.id);
        // Handle failed payment
        break;

      case 'order.paid':
        console.log('Order paid:', payload.order.entity.id);
        break;

      default:
        console.log('Unhandled event:', event);
    }

    res.json({
      success: true,
      message: 'Webhook processed successfully',
    });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed',
      error: error.message,
    });
  }
};

module.exports = {
  handleRazorpayWebhook,
};
