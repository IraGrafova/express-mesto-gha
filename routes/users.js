const router = require('express').Router();
const {
  getUsers, getUserById, createUser, changeUserAvatar, changeUser, login, getMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:id', getUserById);

//router.post('/users', createUser);
router.post('/signup', createUser);

router.post('/signin', login);

router.patch('/me/avatar', changeUserAvatar);

router.patch('/me', changeUser);

module.exports = router;
