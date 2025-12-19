const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const asyncHandler = require('express-async-handler');
const verifyjwt = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('token successfully verified')
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Token is not valid' });
  }
});

module.exports = verifyjwt;
 