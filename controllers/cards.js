const Card = require('../models/card');

const getCards = ('/cards', (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

const createCard = ('/cards', (req, res) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

const deleteCard = ('/cards/:cardId', (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

module.exports = { getCards, createCard, deleteCard };
