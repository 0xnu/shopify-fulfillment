const cargoController = require('../controllers/cargoController');

const cargoRoutes = [
  {
    method: 'GET',
    url: '/api/cargo',
    handler: cargoController.getCargo,
  },
  {
    method: 'GET',
    url: '/api/cargo/:id',
    handler: cargoController.getSingleCargo,
  },
  {
    method: 'POST',
    url: '/api/cargo',
    handler: cargoController.addCargo,
  },
  {
    method: 'PUT',
    url: '/api/cargo/:id',
    handler: cargoController.updateCargo,
  },
  {
    method: 'DELETE',
    url: '/api/cargo/:id',
    handler: cargoController.deleteCargo,
  },
];

module.exports = cargoRoutes;
