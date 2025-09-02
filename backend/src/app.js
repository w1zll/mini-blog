const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { env } = require('./env');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middlewares/error');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');

const app = express();

// Безопасность и middleware
app.use(helmet());
app.use(
   cors({
      origin: env.CORS_ORIGIN,
      credentials: true,
   })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Ограничение запросов на auth
const authLimiter = rateLimit({ windowMs: 60_000, max: 30 }); // 30 запросов/мин
app.use('/auth', authLimiter);

// Роуты
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// 404 и обработка ошибок
app.use(notFound);
app.use(errorHandler);

module.exports = app;
