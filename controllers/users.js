const User = require('../models/user');

const getUsers = ('/users', (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

const getUserById = ('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message.includes('failed for value')) {
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
});

const createUser = ('/users', (req, res) => {
  User.create(req.body)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
});

const changeUser = ('/users/me', (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Пользователь с указанным _id не найден',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
});

const changeUserAvatar = ('/users/me/avatar', (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Пользователь с указанным _id не найден',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
});

module.exports = {
  getUsers, getUserById, createUser, changeUserAvatar, changeUser,
};
