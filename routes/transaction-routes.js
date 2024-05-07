const {
  getAllWithdrawalRequest,
  requestForWithdrawal,
  respondToWithdrawalRequest,
} = require('../controllers/transaction-controller/transaction-controller');
const { verifyToken } = require('../utils/handletoken');

const router = require('express').Router();

router.post('/withdrawal-request', verifyToken, requestForWithdrawal);
router.put('/respond-to-withdrawal', verifyToken, respondToWithdrawalRequest);
router.get('/withdrawal-request', verifyToken, getAllWithdrawalRequest);

module.exports = router;
