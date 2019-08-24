const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
  pubkey: { type: String },
  sellerId: {type: String },
  data: { type: Object },
});

const Sellers = mongoose.model('Sellers', sellerSchema);

module.exports.Sellers = Sellers;