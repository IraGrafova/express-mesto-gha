// eslint-disable-next-line max-classes-per-file
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

module.exports = { ValidationError, LoginError, AccessError, UserNotFound, SignupError };
