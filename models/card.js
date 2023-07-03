const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: { // имя пользователя, строка от 2 до 30 символов, обязательное поле
    type: String,
  },

  link: { // ссылка на картинку, строка, обязательное поле
    type: String,
  },
  owner: { // ссылка на модель автора карточки, тип ObjectId, обязательное поле;
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  // eslint-disable-next-line max-len
  likes: [{ // список лайкнувших пост пользователей, массив ObjectId, по умолчанию — пустой массив (поле default);
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: 'user',
  }],
  createdAt: { // дата создания, тип Date, значение по умолчанию Date.now.
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
