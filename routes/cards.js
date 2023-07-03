const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { createCardJoi, idCardJoi } = require('../middlewares/errors');

router.get('/', getCards);

router.delete('/:id', idCardJoi, deleteCard);

router.post('/', createCardJoi, createCard);

router.put('/:id/likes', idCardJoi, likeCard);

router.delete('/:id/likes', idCardJoi, dislikeCard);

module.exports = router;
