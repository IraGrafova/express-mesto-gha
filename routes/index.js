const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const { celebrate, Joi } = require('celebrate');

const {
  createUser, login,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string().required(),
  })}), login);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string().required(),
  })}), createUser);

router.use(auth);

router.use('/users', userRoutes);
router.use(cardRoutes);



router.patch('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
