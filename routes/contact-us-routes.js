const contactUs = require('../controllers/contact-us-controller/contact-us-controller');

const router = require('express').Router();

router.post('/contact-us', contactUs);

module.exports = router;
