const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error');
// const {
//   createUser, login,
// } = require('./controllers/users');

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use(cookieParser());
// app.use((req, res, next) => {
//   req.user = {
//     _id: '648a0c0d668789572cf721a9', // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });

// app.post('/signin', login);
// app.post('/signup', createUser);

app.use(router);

app.use(errors());

app.use(errorHandler);

app.listen(3000);
