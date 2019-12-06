const articleController = require('../controllers/articleController');

const articleRoutes = [
  {
    method: 'GET',
    url: '/api/article',
    handler: articleController.getArticle,
  },
  {
    method: 'GET',
    url: '/api/article/:id',
    handler: articleController.getSingleArticle,
  },
  {
    method: 'POST',
    url: '/api/article',
    handler: articleController.addArticle,
  },
  {
    method: 'PUT',
    url: '/api/article/:id',
    handler: articleController.updateArticle,
  },
  {
    method: 'DELETE',
    url: '/api/article/:id',
    handler: articleController.deleteArticle,
  },
];

module.exports = articleRoutes;
