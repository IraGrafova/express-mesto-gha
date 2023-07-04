const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const {
  SignupError,
  ValidationError,
  LoginError,
  NotFound,
} = require('../middlewares/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFound('id не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new NotFound('id не найден'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Неверный id');
      } else { next(err); }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => {
          res.status(201).send({ data: user });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(
              new SignupError('Пользователь с указанным email уже существует'),
            );
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  // вытаскиваем email и password из запроса
  const { email, password } = req.body;

  // найти пользователя
  User.findOne({ email })
    .select('+password')
    .orFail(() => new LoginError('Пользователь не найден'))
    .then((user) =>
      // проверить совпадает ли пароль
      // eslint-disable-next-line implicit-arrow-linebreak
      bcrypt.compare(password, user.password).then((isValidUser) => {
        if (isValidUser) {
          // если совпадает - вернуть пользователя
          // создать JWT
          const jwt = jsonWebToken.sign(
            {
              _id: user._id,
            },
            'SECRET',
          );
          // прикрепить его к куке
          res.cookie('jwt', jwt, {
            maxAge: 360000,
            httpOnly: true,
            sameSite: true,
          });
          res.send({ data: user.toJSON() });
        } else {
          // если не совпадает - вернуть ошибку
          next(new LoginError('Передан неверный логин или пароль'));
        }
      }).catch(next))
    .catch(next);
};

const changeUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true,
  })
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  changeUser,
  login,
  getMe,
};
