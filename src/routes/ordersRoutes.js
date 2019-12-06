const ordersController = require('../controllers/ordersController');

const ordersRoutes = [
  {
    method: 'GET',
    url: '/api/orders',
    handler: ordersController.getOrders,
  },
  {
    method: 'GET',
    url: '/api/orders/:id',
    handler: ordersController.getSingleOrders,
  },
  {
    method: 'POST',
    url: '/api/orders',
    handler: ordersController.addOrders,
  },
  {
    method: 'PUT',
    url: '/api/orders/:id',
    handler: ordersController.updateOrders,
  },
  {
    method: 'DELETE',
    url: '/api/orders/:id',
    handler: ordersController.deleteOrders,
  },
];

module.exports = ordersRoutes;
