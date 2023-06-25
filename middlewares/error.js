class ValidationError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Переданы некорректные данные при обновлении';
    this.statusCode = 400;
  }
};

class AccessError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Отсутствуют права для данного действия';
    this.statusCode = 403;
  }
};

class UserNotFound extends Error {
  constructor(err) {
    super(err);
    this.message = 'Пользователь с указанным _id не найден';
    this.statusCode = 404;
  }
};

class SignupError extends Error {
  constructor(err) {
    super(err);
    this.message = 'Данный email уже существует';
    this.statusCode = 409;
  }
};


const errorHandler = (err, req, res, next) => {
console.log(err)
  let error;
//console.log(error)
  if (err.statusCode = 400) {
    error = new ValidationError(err);
  } else if (err.statusCode = 403) {
    error = new AccessError(err);
  } else if (err.statusCode = 404) {
    error = new UserNotFound(err);
  } else if (err.statusCode = 409) {
    error = new SignupError(err);
  }
  console.log('!!!!!!!!!!'+error)
  //else if () {} else {}

  res.status(error.statusCode).send({message: error.message});
  next();
};

module.exports = errorHandler;
