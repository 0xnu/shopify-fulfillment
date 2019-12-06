const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  response_code: String,
  message: String,
  company_code: String,
  sku: String,
  description: String,
  available_qty: Number,
  stock_qty: Number,
  reject_qty: Number,
  accessory_code: String,
  type: String,
});

module.exports = mongoose.model('Article', articleSchema);
