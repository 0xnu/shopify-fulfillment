const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  response_code: String,
  message: String,
  customer_order_id: String,
  type: String,
  order_date: String,
  import_date: String,
  tracking_number: Number,
  tracking_link: String,
  tracking_courier_code: String,
  courier_status_description: String,
  courier_service_description: String,
  courier_extra_service_description: String,
  status_code: String,
  status_descr: String,
  status_date: String,
  qty_packages: Number,
  packages_height: Number,
  packages_width: Number,
  packages_length: Number,
  packages_weight: Number,
  order_type: String,
});

module.exports = mongoose.model('Orders', ordersSchema);