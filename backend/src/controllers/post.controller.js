const { prisma } = require('../db');
const {
   createPostSchema,
   updatePostSchema,
} = require('../validation/post.schema');
const { parsePagination } = require('../utils/pagination');

const listPosts = async (req, res) => {
   const { q, tags, authorId, published, sort } = req.query;
   const { skip, take, page, pageSize } = parsePagination(req.query);

   const where = {};
   if (typeof q === 'string' && q.trim()) {
      where.OR = [
         { title: { contains: q, mode: 'insensitive' } },
         { content: { contains: q, mode: 'insensitive' } },
      ];
   }
   if (typeof authorId === 'string') where.authorId = authorId;
   if (typeof published === 'string') where.published = published === 'true';
   if (typeof tags === 'string' && tags.trim()) {
      const arr = tags
         .split(',')
         .map((t) => t.trim())
         .filter(Boolean);
      if (arr.length) where.tags = { hasEvery: arr };
   }

   let orderBy = { createdAt: 'desc' };
   if (typeof sort === 'string') {
      const [field, dir] = sort.split(':');
      if (field && (dir === 'asc' || dir === 'desc'))
         orderBy = { [field]: dir };
   }

   const [items, total] = await Promise.all([
      prisma.post.findMany({
         where,
         orderBy,
         skip,
         take,
         include: { author: { select: { id: true, name: true, email: true } } },
      }),
      prisma.post.count({ where }),
   ]);

   res.json({ items, page, pageSize, total });
};

const getPost = async (req, res) => {
   const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: { author: { select: { id: true, name: true, email: true } } },
   });
   if (!post) return res.status(404).json({ message: 'Post not found' });
   res.json({ post });
};

const getMyPosts = async (req, res) => {
   const userId = req.user.id;
   const { skip, take, page, pageSize } = parsePagination(req.query);

   const items = await prisma.post.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
   });
   const total = await prisma.post.count({ where: { authorId: userId } });

   res.json({ items, page, pageSize, total });
};

const createPost = async (req, res) => {
   const data = createPostSchema.parse(req.body);

   const post = await prisma.post.create({
      data: {
         title: data.title,
         content: data.content,
         tags: data.tags || [],
         published: data.published !== undefined ? data.published : true,
         authorId: req.user.id,
      },
   });

   res.status(201).json({ post });
};

const updatePost = async (req, res) => {
   const data = updatePostSchema.parse(req.body);

   const existing = await prisma.post.findUnique({
      where: { id: req.params.id },
   });
   if (!existing) return res.status(404).json({ message: 'Post not found' });
   if (existing.authorId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

   const post = await prisma.post.update({
      where: { id: req.params.id },
      data,
   });
   res.json({ post });
};

const deletePost = async (req, res) => {
   const existing = await prisma.post.findUnique({
      where: { id: req.params.id },
   });
   if (!existing) return res.status(404).json({ message: 'Post not found' });
   if (existing.authorId !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

   await prisma.post.delete({ where: { id: req.params.id } });
   res.status(204).send();
};

module.exports = {
   listPosts,
   getPost,
   getMyPosts,
   createPost,
   updatePost,
   deletePost,
};
