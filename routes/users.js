const router = require('express').Router();
const {
  getUsers, getUserById, changeUser, getMe,
} = require('../controllers/users');
const { idJoi, avatarValidationJoi, changeUserJoi } = require('../middlewares/errors');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:id', idJoi, getUserById);

router.patch('/me/avatar', avatarValidationJoi, changeUser);

router.patch('/me', changeUserJoi, changeUser);

module.exports = router;
