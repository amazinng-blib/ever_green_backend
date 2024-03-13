const {
  subscribeToNewsLetter,
  postNews,
} = require('../controllers/subscribe-to-newsLetter-controller/subscribe-to-newsletter-controller');

const router = require('express').Router();

router.post('/subscribe-to-news-letter', subscribeToNewsLetter);
router.post('/post-news', postNews);

module.exports = router;
