const mongoose = require('mongoose');

const articlesSchema = new mongoose.Schema({
  sku: String,
  company_code: String,
  descr: String,
});

module.exports = mongoose.model('Articles', articlesSchema);
