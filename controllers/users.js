const User = require('../models/user');

const getUsers = ('/users', (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

const getUserById = ('/users/:id', (req, res) => {
  // const {id} = req.params;

  User.findById(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({
          message: 'User not found',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
});

const createUser = ('/users', (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

const changeUser = ('/users/me', (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

const changeUserAvatar = ('/users/me/avatar', (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body)
    .then((user) => res.status(201).send(user))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

module.exports = {
  getUsers, getUserById, createUser, changeUserAvatar, changeUser,
};
