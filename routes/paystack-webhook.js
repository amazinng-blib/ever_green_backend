const router = require('express').Router();
const payStackWebhook = require('../controllers/paystack-webhook/paystack-webhook-controller');

router.post('/webhook', payStackWebhook);

module.exports = router;
