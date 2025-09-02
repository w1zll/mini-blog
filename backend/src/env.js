require('dotenv/config');

if (!process.env.JWT_ACCESS_SECRET) {
   throw new Error('JWT_ACCESS_SECRET is not defined in .env');
}

if (!process.env.JWT_REFRESH_SECRET) {
   throw new Error('JWT_REFRESH_SECRET is not defined in .env');
}

const env = {
   NODE_ENV: process.env.NODE_ENV || 'development',
   PORT: Number(process.env.PORT || 4000),
   CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
   JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
   JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
};

module.exports = { env };
