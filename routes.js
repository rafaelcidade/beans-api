const express = require('express');
const Router = express.Router();

const { Quizzes } = require('./models/quizzes');
const { Users } = require('./models/users');

Router.route('/check-answer').post(async(req, res) => {
    const quiz = await Quizzes.findOne({name: req.body.name});
    return res.status(400).json({ body: { message: `Quiz not found ${req.body.name}`}});
    const { sequence } = quiz;
    const user = await Users.findOne({ pubkey: req.body.pubkey });
    const givenAnswer = req.body.sequence.split('');
    const rightAnswer = sequence.split('');

    const answeredQuizzes = user.quizzes;
    if (answeredQuizzes.includes(req.body.name)) {
      return res.status(400).json({ body: { message: `Already answered ${req.body.name}`}});
    }
    answeredQuizzes.push(req.body.name);
    console.log(answeredQuizzes);
    
    // Checks if lengths match
    if (givenAnswer.length !== rightAnswer.length) {
      return res.status(400).json({ body: { message: 'Mismatching lengths'}});
    };

    // Calculates the score
    let score = 0;
    for (var i = 0; i < givenAnswer.length; i++) {
      score += (givenAnswer[i] === rightAnswer[i]) * 1;
    };

    // Returns the score - Do some logic

    await Users.updateOne({pubkey: req.body.pubkey}, {$set: {quizzes: answeredQuizzes}});
    res.status(200).json({body: { score }});
});

Router.route('/insert-quiz').post((req, res) => {
  // if (typeof req.body.name !== 'string' || typeof req.body.questions !== 'object' || typeof req.body.sequence !== 'string') {
  //   console.log(typeof req.body.name);
  //   return res.status(500).json({body: {message: 'Wrong parameters'}});
  // }
  const {name, questions, sequence} = req.body;
  const newQuestion = new Quizzes({name, questions, sequence});
  Quizzes.collection.insertOne(newQuestion)
    .then(_resonse => {
      res.status(200).json({body: {message: 'Question inserted'}});
    });
});

Router.route('/get-quiz').get(async (req, res) => {
  const { name, pubkey } = req.query;
  if(!pubkey) { return res.status(400).json({body: { message: 'Missing user' } }); }
  // if name is null it gets all the quizzes
  const nameQuery = name ? { name } : {};
  // calling lean() method to insert the answered key to each element
  let quizzes = await Quizzes.find(nameQuery).lean();
  const user = await Users.findOne({ pubkey });
  quizzes.forEach(quiz => {
    quiz.answered = false;
    if (user.quizzes.includes(quiz.name)) 
      quiz.answered = true;
    quiz.sequence = undefined;
  });
  if(!quizzes) { return res.status(400).json({body: { message: 'Question not found' } }); }
  return res.status(200).json({ body: quizzes });
});

module.exports = Router;