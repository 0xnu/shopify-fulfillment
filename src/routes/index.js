const userRoutes = require('./userRoutes');
const orderRoutes = require('./orderRoutes');
const ordersRoutes = require('./ordersRoutes');
const cargoRoutes = require('./cargoRoutes');
const cargosRoutes = require('./cargosRoutes');
const articleRoutes = require('./articleRoutes');
const articlesRoutes = require('./articlesRoutes');

const routes = [
  ...userRoutes,
  ...orderRoutes,
  ...ordersRoutes,
  ...cargoRoutes,
  ...cargosRoutes,
  ...articleRoutes,
  ...articlesRoutes,
];

module.exports = routes;
