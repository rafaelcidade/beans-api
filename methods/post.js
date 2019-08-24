const { Quizzes } = require('../models/quizzes');
const { Users } = require('../models/users');
const { Sellers } = require('../models/sellers');

const checkAnswer = async(req, res) => {
    const quiz = await Quizzes.findOne({name: req.body.name});
    if (!quiz) { return res.status(400).json({ body: { message: `Quiz not found ${req.body.name}`}})};
    const { sequence } = quiz;
    const user = await Users.findOne({ pubkey: req.body.pubkey });
    if (!user) { return res.status(400).json({ body: { message: `User not found ${req.body.pubkey}`}})};
    const givenAnswer = req.body.sequence.split('');
    const rightAnswer = sequence.split('');

    const answeredQuizzes = user.quizzes;
    if (answeredQuizzes.includes(req.body.name)) {
      return res.status(400).json({ body: { message: `Already answered ${req.body.name}`}});
    }
    answeredQuizzes.push(req.body.name);
    
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
};
module.exports.checkAnswer = checkAnswer;

const insertQuiz = (req, res) => {
    const quiz = req.body;
    const newQuestion = new Quizzes(quiz);
    Quizzes.collection.insertOne(newQuestion)
      .then(_resonse => {
        res.status(200).json({body: {message: 'Question inserted'}});
      });
};
module.exports.insertQuiz = insertQuiz;

const insertSeller = (req, res) => {
    const seller = req.body;
    const newSeller = new Sellers(seller);
    Sellers.collection.insertOne(newSeller)
      .then(_resonse => {
        res.status(200).json({body: {message: 'Seller inserted'}});
      });
};
module.exports.insertSeller = insertSeller;