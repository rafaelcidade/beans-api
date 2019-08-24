const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3030;

mongoose.connect('mongodb://localhost:27017/beansdb', { useNewUrlParser: true }).then(
  (_res, err) => {
      if(!err)
        console.log('Database is connected');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});