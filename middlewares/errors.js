// eslint-disable-next-line max-classes-per-file
const { celebrate, Joi } = require('celebrate');

class ValidationError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 400;
  }
}

class LoginError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 401;
  }
}

class AccessError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 403;
  }
}

class NotFound extends Error {
  constructor(err) {
    super(err);
    this.message = 'id не найден';
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

const idJoi = celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  }),
});

module.exports = { ValidationError, LoginError, AccessError, NotFound, SignupError, createCardJoi, idJoi };
