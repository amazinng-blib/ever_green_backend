const upload = require('../config/multer');
const {
  register,
  forgotPassword,
  resetPassword,
  loginUser,
  getUserById,
  changeProfilePicture,
} = require('../controllers/auth-controller/auth-controller');
const { verifyToken } = require('../utils/handletoken');

const router = require('express').Router();

router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password', verifyToken, resetPassword);
router.post('/login', loginUser);
router.get('/user', verifyToken, getUserById);
router.put(
  '/change-profile-image',
  verifyToken,
  upload.array('profile_picture'),
  changeProfilePicture
);
module.exports = router;
