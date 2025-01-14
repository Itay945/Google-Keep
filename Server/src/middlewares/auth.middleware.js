const jwt = require('jsonwebtoken');

// Middleware to authenticate JWT
function authToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token required.' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // {userId}
    req.user = payload;
    next();
  });
}

module.exports = authToken;
