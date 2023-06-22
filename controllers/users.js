const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const { isValidObjectId } = require('mongoose');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Некорректный _id пользователя',
        });
      } else if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Пользователь по указанному _id не найден',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
};

const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hashedPassword) => {
      User.create({ ...req.body, password: hashedPassword })
        .then((user) => res.status(201).send({ data: user }))
        .catch(next);
    })
    .catch(next);
};

const login = (req, res, next) => {
  // вытаскиваем email и password из запроса
  const { email, password } = req.body;
  // найти пользователя
  User.findOne({ email })
    .select('+password')
    .orFail(() => new Error('Пользователь не найден'))
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
            res.status(403).send({ message: 'Неправильный пароль' });
          }
        });
    })
    .catch(next);
};

const changeUser = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true,
  })
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Пользователь с указанным _id не найден',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
};

const changeUserAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true,
  })
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Пользователь с указанным _id не найден',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
};

module.exports = {
  getUsers, getUserById, createUser, changeUserAvatar, changeUser, login,
};
