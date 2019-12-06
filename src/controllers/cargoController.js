const boom = require('@hapi/boom');

const Cargo = require('../models/Cargo');

// Get all cargo
exports.getCargo = async () => {
  try {
    const cargo = await Cargo.find();
    return cargo;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single cargo by ID
exports.getSingleCargo = async (req) => {
  try {
    const { id } = req.params;
    const cargo = await Cargo.findById(id);
    return cargo;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new cargo
exports.addCargo = async (req) => {
  const { body } = req;
  try {
    const cargo = new Cargo(body);
    return cargo.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing cargo
exports.updateCargo = async (req) => {
  try {
    const { body: updateData } = req;
    const { id } = req.params;
    const cargo = await Cargo.findByIdAndUpdate(id, updateData, { new: true });
    return cargo;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a cargo
exports.deleteCargo = async (req) => {
  try {
    const { id } = req.params;
    const cargo = await Cargo.findByIdAndRemove(id);
    return cargo;
  } catch (err) {
    throw boom.boomify(err);
  }
};
