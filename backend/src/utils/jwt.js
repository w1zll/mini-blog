const jwt = require('jsonwebtoken');
const { env } = require('../env');

const signAccessToken = (payload) =>
   jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });

const signRefreshToken = (payload) =>
   jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

const verifyAccessToken = (token) => jwt.verify(token, env.JWT_ACCESS_SECRET);

const verifyRefreshToken = (token) => jwt.verify(token, env.JWT_REFRESH_SECRET);

module.exports = {
   signAccessToken,
   signRefreshToken,
   verifyAccessToken,
   verifyRefreshToken,
};
