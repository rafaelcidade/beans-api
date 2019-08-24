const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  pubkey: { type: String },
  privkey: {type: String },
  quizzes: [{ type: String }],
});

const Users = mongoose.model('Users', userSchema);

module.exports.Users = Users;