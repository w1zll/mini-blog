// requireAuth.js
const { verifyAccessToken } = require('../utils/jwt');

const requireAuth = (req, res, next) => {
   const header = req.headers.authorization;
   const token =
      header && header.startsWith('Bearer ') ? header.slice(7) : undefined;

   if (!token) return res.status(401).json({ message: 'Unauthorized' });

   try {
      const payload = verifyAccessToken(token);
      req.user = { id: payload.userId, tokenVersion: payload.tokenVersion };
      next();
   } catch (err) {
      return res.status(401).json({ message: 'Invalid/expired token' });
   }
};

module.exports = { requireAuth };
