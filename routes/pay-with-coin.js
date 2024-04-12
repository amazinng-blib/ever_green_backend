const router = require('express').Router();
const {
  coinbaseCheckoutUrl,
  coinbaseWebhook,
} = require('../controllers/Pay-with-coin/pay-with-coin');

router.post('/checkout', coinbaseCheckoutUrl);
router.post('/webhook', coinbaseWebhook);

module.exports = router;
