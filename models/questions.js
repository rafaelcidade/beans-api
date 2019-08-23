const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  name: { type: String },
  sequence: {type: String },
});

const Questions = mongoose.model('Questions', questionSchema);

module.exports.Questions = Questions;