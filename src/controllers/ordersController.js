const boom = require('@hapi/boom');

const Orders = require('../models/Orders');

// Get all orders
exports.getOrders = async () => {
  try {
    const orders = await Orders.find();
    return orders;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single orders by ID
exports.getSingleOrders = async (req) => {
  try {
    const { id } = req.params;
    const orders = await Orders.findById(id);
    return orders;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new orders
exports.addOrders = async (req) => {
  const { body } = req;
  try {
    const orders = new Orders(body);
    return orders.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing orders
exports.updateOrders = async (req) => {
  try {
    const { body: updateData } = req;
    const { id } = req.params;
    const orders = await Orders.findByIdAndUpdate(id, updateData, { new: true });
    return orders;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a orders
exports.deleteOrders = async (req) => {
  try {
    const { id } = req.params;
    const orders = await Orders.findByIdAndRemove(id);
    return orders;
  } catch (err) {
    throw boom.boomify(err);
  }
};
