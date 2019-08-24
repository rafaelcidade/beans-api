const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
  name: { type: String },
  questions: [
    {
      question: { type: String},
      answers: [
        { type: String },
      ]
    },
  ],
  sequence: {type: String },
});

const Quizzes = mongoose.model('Quizzes', quizSchema);

module.exports.Quizzes = Quizzes;