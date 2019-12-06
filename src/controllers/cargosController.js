const boom = require('@hapi/boom');

const Cargos = require('../models/Cargos');

// Get all cargos
exports.getCargos = async () => {
  try {
    const cargos = await Cargos.find();
    return cargos;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single cargos by ID
exports.getSingleCargos = async (req) => {
  try {
    const { id } = req.params;
    const cargos = await Cargos.findById(id);
    return cargos;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new cargos
exports.addCargos = async (req) => {
  const { body } = req;
  try {
    const cargos = new Cargos(body);
    return cargos.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing cargos
exports.updateCargos = async (req) => {
  try {
    const { body: updateData } = req;
    const { id } = req.params;
    const cargos = await Cargos.findByIdAndUpdate(id, updateData, { new: true });
    return cargos;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a cargos
exports.deleteCargos = async (req) => {
  try {
    const { id } = req.params;
    const cargos = await Cargos.findByIdAndRemove(id);
    return cargos;
  } catch (err) {
    throw boom.boomify(err);
  }
};
