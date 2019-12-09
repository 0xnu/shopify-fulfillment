const orderController = require('../controllers/orderController');

const orderRoutes = [
  {
    method: 'GET',
    url: '/api/order',
    handler: orderController.getOrder,
  },
  {
    method: 'GET',
    url: '/api/order/:id',
    handler: orderController.getSingleOrder,
  },
  {
    method: 'POST',
    url: '/api/order',
    handler: orderController.addOrder,
  },
  {
    method: 'POST',
    url: '/api/insertorders',
    handler: orderController.insertOrders,
  },
  {
    method: 'POST',
    url: '/api/insertdoc',
    handler: orderController.sendDoc,
  },
  {
    method: 'PUT',
    url: '/api/order/:id',
    handler: orderController.updateOrder,
  },
  {
    method: 'DELETE',
    url: '/api/order/:id',
    handler: orderController.deleteOrder,
  },
  {
    method: 'GET',
    url: '/api/ordersstatus',
    handler: orderController.ordersStatus,
  },
  {
    method: 'GET',
    url: '/api/orderstatus',
    handler: orderController.orderStatus,
  },
];

module.exports = orderRoutes;
