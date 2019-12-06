const boom = require('@hapi/boom');

const Articles = require('../models/Articles');

// Get all articles
exports.getArticles = async () => {
  try {
    const articles = await Articles.find();
    return articles;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single articles by ID
exports.getSingleArticles = async (req) => {
  try {
    const { id } = req.params;
    const articles = await Articles.findById(id);
    return articles;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new articles
exports.addArticles = async (req) => {
  const { body } = req;
  try {
    const articles = new Articles(body);
    return articles.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing articles
exports.updateArticles = async (req) => {
  try {
    const { body: updateData } = req;
    const { id } = req.params;
    const articles = await Articles.findByIdAndUpdate(id, updateData, { new: true });
    return articles;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a articles
exports.deleteArticles = async (req) => {
  try {
    const { id } = req.params;
    const articles = await Articles.findByIdAndRemove(id);
    return articles;
  } catch (err) {
    throw boom.boomify(err);
  }
};
