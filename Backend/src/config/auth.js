const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'mi_clave_secreta';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Authorization header missing' }));
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Invalid authorization format' }));
  }

  const token = parts[1];

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({ error: 'Invalid or expired token' }));
    }

    req.user = user; // datos del token
    next();
  });
}

module.exports = authenticateToken;