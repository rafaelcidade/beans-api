const express = require('express');
const Router = express.Router();
const web3 = require('web3');

const { Questions } = require('../models/questions');

Router.route('/check-answer').post((req, res) => {
    const quiz = req.body.name;
    const sequence = req.body.sequence;
    Questions.findOne({name: quiz})
    .then(document => {
      const isCorrect = document.sequence === web3.utils.sha3(sequence);
      // console.log(isCorrect);
    });
});

module.exports = Router;