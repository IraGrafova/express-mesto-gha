const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const { isValidObjectId } = require('mongoose');
const { SignupError, ValidationError, LoginError } = require('../middlewares/errors');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getMe = (req, res, next) => {
  // console.log(req.user._id)
  User.findById(req.user._id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => {
          res.status(201).send({ data: user });
        })
        .catch(err => {throw new SignupError()}
        //   err => {
        //   if (err) {
        //     throw new SignupError();
        //   }console.log('another err')
        // }
        );
    })
    .catch(next);
};

const login = (req, res, next) => {
  // вытаскиваем email и password из запроса
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ValidationError('Введите данные');

    // res.status(403).send({ message: 'Введите данные' });
    // return;
  }

  // найти пользователя
  User.findOne({ email })
    .select('+password')
    .orFail(() => new LoginError('Пользователь не найден'))
    .then((user) => {
    // проверить совпадает ли пароль
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) { // если совпадает - вернуть пользователя
            // создать JWT
            const jwt = jsonWebToken.sign({
              _id: user._id,
            }, 'SECRET');
            // прикрепить его к куке
            res.cookie('jwt', jwt, {
              maxAge: 360000,
              httpOnly: true,
              sameSite: true,
            });
            res.send({ data: user.toJSON() });
          } else { // если не совпадает - вернуть ошибку
            throw new LoginError('Передан неверный логин или пароль');
          }
        });
    })
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

const changeUserAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true,
  })
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports = {
  getUsers, getUserById, createUser, changeUserAvatar, changeUser, login, getMe,
};
