const {
  saveBotLink,
  getBotLink,
} = require('../controllers/bot-controller/bot-controller');
const { verifyToken } = require('../utils/handletoken');

const router = require('express').Router();

router.post('/save-bot-link', verifyToken, saveBotLink);
router.get('/get-bot-link', getBotLink);
module.exports = router;
