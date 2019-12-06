const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const fastify = require('fastify')();
const Promise = require("bluebird");
const bodyParser = require('body-parser');
const { registerValidation, loginValidation } = require('./src/auth/validation');
const verifytoken = require('./src/auth/verifytoken');
require('dotenv').config();

// Read host address, port, and DB from the environment
const PORT = process.env.PORT;
const HOST = process.env.HOST;

// const fastify = require('fastify')({
//   http2: true,
//   https: {
//     key: fs.readFileSync(path.join(__dirname, '.', './src/https', 'server.key')),
//     cert: fs.readFileSync(path.join(__dirname, '.', './src/https', 'server.crt')),

//     // allowHTTP1 {boolean} Incoming client connections that do not support HTTP/2
//     // will be downgraded to HTTP/1.x when set to true. See the 'unknownProtocol' event.
//     // See ALPN negotiation. Default: false.
//     allowHTTP1: true
//   },
//   logger: true,
// });

// Swagger options
const swagger = require('./src/config/swagger2');
fastify.register(require('fastify-swagger'), swagger.options);

// parse application/x-www-form-urlencoded
fastify.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
fastify.use(bodyParser.json());

const routes = require('./src/routes');

// ES6 promises
mongoose.Promise = Promise;

// mongodb connection
mongoose.connect(process.env.MongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  promiseLibrary: global.Promise
});

const db = mongoose.connection;

// mongodb error
db.on('error', console.error.bind(console, 'connection error:'));

// mongodb connection open
db.once('open', () => {
  console.log(`Connected to Mongo at: ${new Date()}`);
});

routes.forEach((route) => {
  fastify.route(route);
});

fastify.listen(process.env.PORT || 5000, 'localhost', function (err) {
  if (err) throw err
  console.log(`Fastify server listening on ${fastify.server.address().port}`)
})

// const start = async () => {
//   try {
//     await fastify.listen(PORT, HOST);
//     fastify.swagger();
//     fastify.log.info(`Server on: ${fastify.server.address().PORT}`);
//   } catch (err) {
//     fastify.log.error(err);
//     process.exit(1);
//   }
// };

// start();
