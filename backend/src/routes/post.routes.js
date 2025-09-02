const { Router } = require('express');
const { ah } = require('../middlewares/asyncHandler');
const {
   createPost,
   deletePost,
   getMyPosts,
   getPost,
   listPosts,
   updatePost,
} = require('../controllers/post.controller');
const { requireAuth } = require('../middlewares/requireAuth');

const r = Router();

r.get('/', ah(listPosts));
r.get('/:id', ah(getPost));
r.get('/by/me/mine', ah(requireAuth), ah(getMyPosts)); // requireAuth через ah
r.post('/', ah(requireAuth), ah(createPost));
r.patch('/:id', ah(requireAuth), ah(updatePost));
r.delete('/:id', ah(requireAuth), ah(deletePost));

module.exports = r;
