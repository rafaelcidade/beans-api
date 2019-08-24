const { Quizzes } = require('../models/quizzes');
const { Users } = require('../models/users');
const { Sellers } = require('../models/sellers');

const getQuiz = async (req, res) => {
    const { name, pubkey } = req.query;
    if(!pubkey) { return res.status(400).json({body: { message: 'Missing user' } }); }
    // if name is null it gets all the quizzes
    const nameQuery = name ? { name } : {};
    // calling lean() method to insert the answered key to each element
    let quizzes = await Quizzes.find(nameQuery).lean();
    const user = await Users.findOne({ pubkey });
    if (!user) { return res.status(400).json({ body: { message: `User not found ${pubkey}`}})};
    quizzes.forEach(quiz => {
      quiz.answered = false;
      if (user.quizzes.includes(quiz.name)) 
        quiz.answered = true;
      quiz.sequence = undefined;
    });
    if(!quizzes) { return res.status(400).json({body: { message: 'Question not found' } }); }
    return res.status(200).json({ body: quizzes });
};
module.exports.getQuiz = getQuiz;

const getSeller = async (req, res) => {
    const { sellerId } = req.query;
    if(!sellerId) { return res.status(400).json({body: { message: 'Missing sellerId' } }); }
    const seller = await Sellers.findOne({ sellerId });
    if (!seller) { return res.status(400).json({ body: { message: `Seller not found ${sellerId}`}})};
    return res.status(200).json({ body: seller });
};
module.exports.getSeller = getSeller;