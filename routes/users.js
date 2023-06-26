const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, createUser, changeUserAvatar, changeUser, login,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:id', getUserById);

//router.post('/users', createUser);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', login);

router.patch('/users/me/avatar', changeUserAvatar);

router.patch('/users/me', changeUser);

module.exports = router;
