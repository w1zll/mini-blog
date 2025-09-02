const { prisma } = require('../db');
const { loginSchema, registerSchema } = require('../validation/auth.schema');
const { hashPassword, verifyPassword } = require('../utils/hash');
const {
   signAccessToken,
   signRefreshToken,
   verifyRefreshToken,
} = require('../utils/jwt');

const REFRESH_COOKIE = 'refreshToken';

const setRefreshCookie = (res, token) => {
   res.cookie(REFRESH_COOKIE, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
   });
};

const register = async (req, res) => {
   const data = registerSchema.parse(req.body);

   const exists = await prisma.user.findUnique({
      where: { email: data.email },
   });
   if (exists) return res.status(409).json({ message: 'Email already in use' });

   const user = await prisma.user.create({
      data: {
         email: data.email,
         passwordHash: await hashPassword(data.password),
         name: data.name,
      },
      select: { id: true, email: true, name: true, tokenVersion: true },
   });

   const access = signAccessToken({
      userId: user.id,
      tokenVersion: user.tokenVersion,
   });
   const refresh = signRefreshToken({
      userId: user.id,
      tokenVersion: user.tokenVersion,
   });
   setRefreshCookie(res, refresh);

   res.status(201).json({ user, accessToken: access });
};

const login = async (req, res) => {
   const data = loginSchema.parse(req.body);

   const user = await prisma.user.findUnique({ where: { email: data.email } });
   if (!user) return res.status(401).json({ message: 'Invalid credentials' });

   const ok = await verifyPassword(data.password, user.passwordHash);
   if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

   const access = signAccessToken({
      userId: user.id,
      tokenVersion: user.tokenVersion,
   });
   const refresh = signRefreshToken({
      userId: user.id,
      tokenVersion: user.tokenVersion,
   });
   setRefreshCookie(res, refresh);

   res.json({
      user: {
         id: user.id,
         email: user.email,
         name: user.name,
         tokenVersion: user.tokenVersion,
      },
      accessToken: access,
   });
};

const refresh = async (req, res) => {
   const token = req.cookies?.[REFRESH_COOKIE];
   if (!token) return res.status(401).json({ message: 'No refresh token' });

   try {
      const payload = verifyRefreshToken(token);
      const user = await prisma.user.findUnique({
         where: { id: payload.userId },
      });
      if (!user || user.tokenVersion !== payload.tokenVersion)
         return res.status(401).json({ message: 'Invalid refresh token' });

      const newRefresh = signRefreshToken({
         userId: user.id,
         tokenVersion: user.tokenVersion,
      });
      setRefreshCookie(res, newRefresh);

      const access = signAccessToken({
         userId: user.id,
         tokenVersion: user.tokenVersion,
      });
      res.json({ accessToken: access });
   } catch (err) {
      return res.status(401).json({ message: 'Invalid refresh token' });
   }
};

const logout = async (_req, res) => {
   res.clearCookie(REFRESH_COOKIE, { path: '/auth/refresh' });
   res.status(204).send();
};

const me = async (req, res) => {
   const userId = req.user.id; // предполагается, что middleware положил user в req
   const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
   });
   res.json({ user });
};

module.exports = {
   register,
   login,
   refresh,
   logout,
   me,
};
