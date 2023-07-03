const Card = require("../models/card");
const {
  AccessError,
  ValidationError,
  NotFound,
} = require("../middlewares/errors");

const getCards = (req, res) => {
  Card.find({})
    .populate("likes")
    .then((cards) => res.status(200).send(cards))
    .catch((err) =>
      res
        .status(500)
        .send({
          message: "Internal Server Error",
          err: err.message,
          stack: err.stack,
        })
    );
};

const createCard = (req, res, next) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new ValidationError(
          "Переданы некорректные данные при создании карточки"
        );
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .populate("owner")
    .orFail(() => new Error("Not found"))
    .then((card) => {
      if (req.user._id != card.owner._id) {
        throw new AccessError("Отсутствуют права для данного действия");
      } else {
        res.status(200).send(card);
      }
    })
    .catch((err) => {
      if (err.message === "Not found") {
        throw new NotFound();
      } else if (err.name === "CastError") {
        throw new ValidationError("Неверный id");
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => new Error("Not found"))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new ValidationError(
          "Переданы некорректные данные для постановки/снятия лайка"
        );
      } else if (err.message === "Not found") {
        throw new NotFound();
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => new Error("Not found"))
    .then((likes) => res.status(200).send(likes))
    .catch((err) => {
      if (err.name === "CastError") {
        throw new ValidationError(
          "Переданы некорректные данные для постановки/снятии лайка"
        );
      } else if (err.message === "Not found") {
        throw new NotFound("Передан несуществующий _id карточки");
      }
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
