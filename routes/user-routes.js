const {
  register,
  forgotPassword,
  resetPassword,
  loginUser,
  getUserById,
  updateUserDetails,
  fetchAllUsers,
  changeProfile,
} = require('../controllers/user-controller/user-controller');
const { verifyToken } = require('../utils/handletoken');
const upload = require('../config/multer');

const router = require('express').Router();

router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password', verifyToken, resetPassword);
router.post('/login', loginUser);
router.put(
  '/change-profile-image',
  verifyToken,
  upload.array('profile_picture'),
  changeProfile
);
router.get('/user', verifyToken, getUserById);

router.put('/update-user-details', verifyToken, updateUserDetails);
router.get('/all-users', fetchAllUsers);
module.exports = router;
