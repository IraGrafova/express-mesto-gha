const router = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);

router.get('/cards/:id', deleteCard);

router.post('/cards', createCard);

module.exports = router;
