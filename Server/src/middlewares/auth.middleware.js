const jwt = require('jsonwebtoken');
require('dotenv').config();
// Middleware to authenticate JWT
function authToken(req, res, next) {
  try {
    // const authHeader = req.headers.authorization;
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token required.' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT, (err, payload) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token.' });
      }
      // const date = new Date(authToken.exp * 1000).toLocaleDateString();
      // console.log(date);
      // {userId}

      req.user = payload;
      next();
    });
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = authToken;
