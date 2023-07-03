const Card = require('../models/card');
const { AccessError, ValidationError } = require('../middlewares/errors');

const getCards = (req, res) => {
  Card.find({})
    .populate('likes')
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack }));
};

const createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch(err => {
      if(err.name === 'CastError')
      {throw new ValidationError('Переданы некорректные данные при создании карточки')}
      })
    .catch(next);
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id).populate('owner')

    .orFail(() => new Error('Not found'))
    .then((card) => {
      if (req.user._id != card.owner._id) {
        //throw new AccessError('Отсутствуют права для данного действия');
        res.status(403).send({ message: 'Нельзя удалять карточки других пользователей' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Карточка с указанным _id не найдена',
        });
      } else if (err.name === 'CastError') {
        res.status(400).send({
          message: 'Некорректный _id карточки',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
      } else if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Передан несуществующий _id карточки',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new Error('Not found'))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные для постановки/снятии лайка' });
      } else if (err.message === 'Not found') {
        res.status(404).send({
          message: 'Передан несуществующий _id карточки',
        });
      } else {
        res.status(500).send({ message: 'Internal Server Error', err: err.message, stack: err.stack });
      }
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
