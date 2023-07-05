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
    this.statusCode = 404;
  }
}

class SignupError extends Error {
  constructor(err) {
    super(err);
    this.statusCode = 409;
  }
}

const idJoi = celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  }),
});

const signinJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const signupJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string().pattern(/https?:\/\/[-._~:/?#[\]@!$&'()*+,;=\w]{1,}/m),
  }),
});

const changeUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const avatarValidationJoi = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/[-._~:/?#[\]@!$&'()*+,;=\w]{1,}/m).required(),
  }),
});

const createCardJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(/https?:\/\/[-._~:/?#[\]@!$&'()*+,;=\w]{1,}/m).required(),
  }),
});

module.exports = {
  ValidationError,
  LoginError,
  AccessError,
  NotFound,
  SignupError,
  createCardJoi,
  idJoi,
  avatarValidationJoi,
  signinJoi,
  signupJoi,
  changeUserJoi,
};
