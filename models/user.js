const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // имя пользователя, строка от 2 до 30 символов, обязательное поле
    default: 'Жак-Ив Кусто',
    type: String,
  },
  about: { // информация о пользователе, строка от 2 до 30 символов, обязательное поле
    default: 'Исследователь',
    type: String,
  },
  avatar: { // ссылка на аватарку, строка, обязательное поле
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заполнено'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);
