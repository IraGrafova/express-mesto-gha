const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { // имя пользователя, строка от 2 до 30 символов, обязательное поле
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: { // ссылка на картинку, строка, обязательное поле
    type: String,
    required: true,
  },
  owner: { // ссылка на модель автора карточки, тип ObjectId, обязательное поле;
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  // eslint-disable-next-line max-len
  likes: [{ // список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: { // дата создания, тип Date, значение по умолчанию Date.now.
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
