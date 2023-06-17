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
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message.includes('validation failed')) {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
});

const deleteCard = ('/cards/:cardId', (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error('Not found'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Карточка с указанным _id не найдена',
        });
      }
      else if (err.message.includes('failed for value')) {
        res.status(400).send({
          message: 'Некорректный _id карточки',
        });
      }
      else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
});

const likeCard = ('/cards/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.message.includes('failed for value')) {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
      } else if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Передан несуществующий _id карточки',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
});

const dislikeCard = ('/cards/:cardId/likes', (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.message.includes('failed for value')) {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
      } else if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Передан несуществующий _id карточки',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
});

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
