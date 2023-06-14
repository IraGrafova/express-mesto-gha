const Card = require('../models/card');

const getCards = ('/cards', (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

const createCard = ('/cards', (req, res) => {
  Card.create(req.body)
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

const deleteCard = ('/cards/:cardId', (req, res) => {
  Card.delete(req.params.id) // или как
    .then((card) => res.status(201).send(card))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
});

module.exports = { getCards, createCard, deleteCard };

//  console.log(req.user._id); // _id станет доступен
