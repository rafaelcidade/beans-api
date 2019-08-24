const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3030;

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/beansdb';

mongoose.connect(mongoUri, { useNewUrlParser: true }).then(
  (_res, err) => {
      if(!err)
        console.log('Database is connected');
  });

// app.get('/get-quiz', cors({ origin: false }));
// app.post('/check-answer', cors({ origin: false }));
// app.post('/insert-quiz', cors({ origin: false }));
app.use(cors({ origin: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', router);

app.listen(PORT, () => {
  console.log('Server is running on PORT:',PORT);
});