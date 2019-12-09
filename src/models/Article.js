const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  sku: String,
  company_code: String,
  descr: String,
});

module.exports = mongoose.model('Article', articleSchema);
