const Card = require('../models/card');
const {
  AccessError,
  ValidationError,
  NotFound,
} = require('../middlewares/errors');

const getCards = (req, res, next) => {
  Card.find({})
    .populate('likes')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
      } else next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .populate('owner')
    .orFail(() => new NotFound('id не найден'))
    // eslint-disable-next-line consistent-return
    .then((card) => {
      // eslint-disable-next-line eqeqeq
      if (req.user._id != card.owner._id) {
        next(new AccessError('Отсутствуют права для данного действия'));
      } else {
        return Card.deleteOne(card).then(() => {
          res.send(card);
        });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Неверный id'));
      } else next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => new NotFound('id не найден'))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(
          'Переданы некорректные данные для постановки/снятия лайка',
        ));
      } else next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => new NotFound('Передан несуществующий _id карточки'))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(
          'Переданы некорректные данные для постановки/снятии лайка',
        ));
      } else next(err);
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
