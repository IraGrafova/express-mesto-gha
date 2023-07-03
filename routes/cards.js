const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const { createCardJoi, idJoi } = require('../middlewares/errors');

router.get('/', getCards);

router.delete('/:id', idJoi, deleteCard);

router.post('/', createCardJoi, createCard);

router.put('/:id/likes', idJoi, likeCard);

router.delete('/:id/likes', idJoi, dislikeCard);

module.exports = router;
