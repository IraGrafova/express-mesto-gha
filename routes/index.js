const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const {
  NotFound, signinJoi, signupJoi,
} = require('../middlewares/errors');

const {
  createUser, login,
} = require('../controllers/users');

router.post('/api/signin', signinJoi, login);
router.post('/api/signup', signupJoi, createUser);

router.use(auth);

router.use('/api/users', userRoutes);

router.use('/api/cards', cardRoutes);

router.patch('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
module.exports = router;
