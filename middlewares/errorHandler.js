const errorHandler = (err, req, res, next) => {
  // console.log(err)
  // let error;
  // //console.log(error)
  // if ((err.statusCode = 400)) {
  //   error = new ValidationError(err);
  // } else if ((err.statusCode = 403)) {
  //   error = new AccessError(err);
  // } else if ((err.statusCode = 404)) {
  //   error = new UserNotFound(err);
  // } else if ((err.statusCode = 409)) {
  //   error = new SignupError(err);
  // }
  // //console.log('!!!!!!!!!!'+error)
  // //else if () {} else {}
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+err)
  res.status(err.statusCode).send({ message: err.message });
  next();
};

module.exports = errorHandler;
