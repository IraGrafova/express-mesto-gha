const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.delete('/cards/:id', deleteCard);

router.post('/cards', createCard);

router.put('/cards/:id/likes', likeCard);

router.delete('/cards/:id/likes', dislikeCard);

module.exports = router;
