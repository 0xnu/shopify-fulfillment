const cargosController = require('../controllers/cargosController');

const cargosRoutes = [
  {
    method: 'GET',
    url: '/api/cargos',
    handler: cargosController.getCargos,
  },
  {
    method: 'GET',
    url: '/api/cargos/:id',
    handler: cargosController.getSingleCargos,
  },
  {
    method: 'POST',
    url: '/api/cargos',
    handler: cargosController.addCargos,
  },
  {
    method: 'PUT',
    url: '/api/cargos/:id',
    handler: cargosController.updateCargos,
  },
  {
    method: 'DELETE',
    url: '/api/cargos/:id',
    handler: cargosController.deleteCargos,
  },
];

module.exports = cargosRoutes;
