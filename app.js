const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const router = require('./routes/index');

const app = express();

mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use((req, res, next) => {
  req.user = {
    _id: '648a0c0d668789572cf721a9', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(router);

app.listen(3000);
