const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret_key_here';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Placeholder for Firebase authentication (to be implemented later)
const authenticateFirebaseToken = (req, res, next) => {
  // For now, just pass through - will implement Firebase Auth later
  req.user = { uid: 'placeholder-uid', data: { role: 'admin' } };
  next();
};

module.exports = { authenticateToken, authorizeRoles, authenticateFirebaseToken };
