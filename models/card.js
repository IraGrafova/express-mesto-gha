const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: { // имя пользователя, строка от 2 до 30 символов, обязательное поле
    type: String,
    // required: [true, 'Поле "name" должно быть заполнено'],
    // minlength: [2, 'Минимальная длина поля "name" - 2'],
    // maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },

  link: { // ссылка на картинку, строка, обязательное поле
    type: String,
    // required: [true, 'Поле "link" должно быть заполнено'],
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
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Некорректный URL',
    },
  }],
  createdAt: { // дата создания, тип Date, значение по умолчанию Date.now.
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
