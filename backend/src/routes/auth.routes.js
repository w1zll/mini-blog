const { Router } = require('express');
const { ah } = require('../middlewares/asyncHandler');
const {
   login,
   me,
   refresh,
   register,
   logout,
} = require('../controllers/auth.controller');
const { requireAuth } = require('../middlewares/requireAuth');

const r = Router();

r.post('/register', ah(register));
r.post('/login', ah(login));
r.post('/refresh', ah(refresh));
r.post('/logout', ah(logout));
r.get('/me', ah(requireAuth), ah(me)); // добавляем requireAuth для защищённого роута

module.exports = r;
