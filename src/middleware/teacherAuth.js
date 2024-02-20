const jwt = require('jsonwebtoken');
require('dotenv').config();

const teacherAuth = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ error: 'Access token not provided' });
  }

  jwt.verify(token, process.env.PRIVATEKEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid access token' });
    }

    req.teacherId = decoded.teacherId;
    next();
  });
};

module.exports = {
  teacherAuth
};