const {
  subscribeToPlan,
  upgradePlan,
  subscriptionCompleted,
  allSubscriptions,
} = require('../controllers/subscription-controller/subscription-controller');
const { verifyToken } = require('../utils/handletoken');

const router = require('express').Router();

router.post('/subscribe', verifyToken, subscribeToPlan);
router.put('/upgrade-subscription', verifyToken, upgradePlan);
router.put('/subscription-completed', verifyToken, subscriptionCompleted);
router.get('/all-subscriptions', allSubscriptions);

module.exports = router;
