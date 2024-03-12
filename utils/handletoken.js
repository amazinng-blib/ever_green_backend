const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    'somesecretethat7889838'
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

    const verified = jwt.verify(token, 'somesecretethat7889838');
    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};
module.exports = { verifyToken, generateToken };
