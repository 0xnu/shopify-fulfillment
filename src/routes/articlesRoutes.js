const articlesController = require('../controllers/articlesController');

const articlesRoutes = [
  {
    method: 'GET',
    url: '/api/articles',
    handler: articlesController.getArticles,
  },
  {
    method: 'GET',
    url: '/api/articles/:id',
    handler: articlesController.getSingleArticles,
  },
  {
    method: 'POST',
    url: '/api/articles',
    handler: articlesController.addArticles,
  },
  {
    method: 'POST',
    url: '/api/insert_articles',
    handler: articlesController.insertArticles,
  },
  {
    method: 'PUT',
    url: '/api/articles/:id',
    handler: articlesController.updateArticles,
  },
  {
    method: 'DELETE',
    url: '/api/articles/:id',
    handler: articlesController.deleteArticles,
  },
];

module.exports = articlesRoutes;
