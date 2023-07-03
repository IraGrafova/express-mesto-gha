// eslint-disable-next-line max-classes-per-file
const { celebrate, Joi } = require('celebrate');

class ValidationError extends Error {
  constructor(err) {
    super(err);
  //  this.message = 'Переданы некорректные данные при обновлении';
    this.statusCode = 400;
  }
}

class LoginError extends Error {
  constructor(err) {
    super(err);
  //  this.message = 'Переданы некорректные данные при обновлении';
    this.statusCode = 401;
  }
}

class AccessError extends Error {
  constructor(err) {
    super(err);
    //this.message = 'Отсутствуют права для данного действия';
    this.statusCode = 403;
  }
}

class UserNotFound extends Error {
  constructor(err) {
    super(err);
    this.message = 'Пользователь с указанным _id не найден';
    this.statusCode = 404;
  }
}

class SignupError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 409;
  }
}

const createCardJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(/https?:\/\/[-._~:/?#[\]@!$&'()*+,;=\w]{1,}/m).required(),
    likes: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  }),
});

const idCardJoi = celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  }),
});

module.exports = { ValidationError, LoginError, AccessError, UserNotFound, SignupError, createCardJoi, idCardJoi };
