const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const auth = require('../middlewares/auth');
const {
  createUser, login,
} = require('../controllers/users');

router.post('/signin', login);
router.post('/signup', createUser);

router.use(auth);

router.use(userRoutes);
router.use(cardRoutes);



router.patch('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
