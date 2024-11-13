const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for JWT authentication
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Add decoded token to request object
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' });
  }
};

// Role-based authorization middleware
const roleAuthorization = (roles) => (req, res, next) => {
  auth(req, res, () => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Access is denied' });
    }
    next();
  });
};

module.exports = { auth, roleAuthorization };
