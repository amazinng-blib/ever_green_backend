const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user, expiresIn = '30d') => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: expiresIn,
    }
  );
};

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};
module.exports = { verifyToken, generateToken };
