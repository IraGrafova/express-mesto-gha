const User = require('../models/user');

const getUsers = ('/users', (req, res) => {
  User.find({})
  .then(users => res.status(200).send(users))
  .catch(err => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack}))

});

const getUserById = ('/users/:id', (req, res) => {
  const { id } = req.params;

  User.findById(req.params.id)
  .then(user => res.status(200).send(user))
  .catch(err => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack}))
});

const createUser = ('/users', (req, res) => {
  User.create(req.body)
  .then(user => res.status(201).send(user))
  .catch(err => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack}))

});

module.exports = {getUsers, getUserById, createUser}