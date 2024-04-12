const router = require('express').Router();
const contactUs = require('../controllers/contact-us-controller/contact-us-controller');

router.post('/contact-us', contactUs);

module.exports = router;
