const router = require('express').Router();
const {
  getUsers, getUserById, createUser, changeUserAvatar, changeUser,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

router.post('/users', createUser);

router.patch('/users/me/avatar', changeUserAvatar);

router.patch('/users/me', changeUser);

module.exports = router;
