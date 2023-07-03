const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');

const {
  createUser, login,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string().pattern(/https?:\/\/[-._~:/?#[\]@!$&'()*+,;=\w]{1,}/m),
  }),
}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string().pattern(/https?:\/\/[-._~:/?#[\]@!$&'()*+,;=\w]{1,}/m),
  }),
}),
createUser);

router.use(auth);

router.use('/users', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().email(),
    password: Joi.string(),
    avatar: Joi.string().pattern(/https?:\/\/[-._~:/?#[\]@!$&'()*+,;=\w]{1,}/m),
  }),
  params: Joi.object().keys({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  }),
}), userRoutes);

router.use('/cards', cardRoutes);


router.patch('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
