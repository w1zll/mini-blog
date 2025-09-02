const { z } = require('zod');

const registerSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6).max(72),
   name: z.string().min(2).max(40).optional(),
});

const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6).max(72),
});

module.exports = { registerSchema, loginSchema };
