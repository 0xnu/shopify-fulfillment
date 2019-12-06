const boom = require('@hapi/boom');

const Article = require('../models/Article');

// Get all article
exports.getArticle = async () => {
  try {
    const article = await Article.find();
    return article;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single article by ID
exports.getSingleArticle = async (req) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    return article;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new article
exports.addArticle = async (req) => {
  const { body } = req;
  try {
    const article = new Article(body);
    return article.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing article
exports.updateArticle = async (req) => {
  try {
    const { body: updateData } = req;
    const { id } = req.params;
    const article = await Article.findByIdAndUpdate(id, updateData, { new: true });
    return article;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a article
exports.deleteArticle = async (req) => {
  try {
    const { id } = req.params;
    const article = await Article.findByIdAndRemove(id);
    return article;
  } catch (err) {
    throw boom.boomify(err);
  }
};
