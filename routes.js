const express = require('express');
const Router = express.Router();

const { checkAnswer, insertQuiz, insertSeller } = require('./methods/post');
const { getQuiz, getSeller } = require('./methods/get');

Router.route('/check-answer').post(checkAnswer);
Router.route('/insert-quiz').post(insertQuiz);
Router.route('/insert-seller').post(insertSeller);

Router.route('/get-quiz').get(getQuiz);
Router.route('/get-seller').get(getSeller);

module.exports = Router;