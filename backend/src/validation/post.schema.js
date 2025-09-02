const { z } = require('zod');

const createPostSchema = z.object({
   title: z.string().min(1).max(150),
   content: z.string().min(1),
   tags: z.array(z.string()).optional(),
   published: z.boolean().optional(),
});

const updatePostSchema = createPostSchema.partial();

module.exports = { createPostSchema, updatePostSchema };
