const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  response_code: String,
  message: String,
  goods_receipts: String,
  list_number: Number,
  company_code: String,
  supplier_code: String,
  order_id: String,
  imported_date: String,
  ddt_number: Number,
  ddt_date: String,
  status_code: String,
  status_descr: String,
  status_date: String,
  articles_item_row_number: Number,
  articles_item_subrow_number: Number,
  articles_item_sku: String,
  articles_item_ddt_qty: Number,
  articles_item_received_qty: Number,
  articles_item_batch: String,
  articles_item_expiration_date: String,
  type: String,
});

module.exports = mongoose.model('Cargo', cargoSchema);
