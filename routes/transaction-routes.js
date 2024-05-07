const {
  getAllWithdrawalRequest,
  requestForWithdrawal,
  respondToWithdrawalRequest,
  submitWalletAddress,
} = require('../controllers/transaction-controller/transaction-controller');
const { verifyToken } = require('../utils/handletoken');

const router = require('express').Router();

router.post('/withdrawal-request', verifyToken, requestForWithdrawal);
router.put('/respond-to-withdrawal', verifyToken, respondToWithdrawalRequest);
router.put('/submit-wallet-address', verifyToken, submitWalletAddress);
router.get('/withdrawal-request', verifyToken, getAllWithdrawalRequest);

module.exports = router;
