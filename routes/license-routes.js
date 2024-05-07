const {
  requestForLicenseKey,
  assignLicenseKey,
  toggleLicenseKeyStatusToExpired,
  getUserLicenses,
} = require('../controllers/license-controller/license-controller');
const { verifyToken } = require('../utils/handletoken');

const router = require('express').Router();
router.post('/request-license-key', verifyToken, requestForLicenseKey);
router.put('/assign-license-key/:id', verifyToken, assignLicenseKey);
router.put('/expire-license', verifyToken, toggleLicenseKeyStatusToExpired);
router.get('/get-user-license', verifyToken, getUserLicenses);
module.exports = router;
