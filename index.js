const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const fastify = require('fastify')();
const Promise = require("bluebird");
const bodyParser = require('body-parser');
const { registerValidation, loginValidation } = require('./src/auth/validation');
const verifytoken = require('./src/auth/verifytoken');
const webhook = require('./src/controllers/orderController');

const express = require('express');
const app = express();
const getRawBody = require('raw-body');
const crypto = require('crypto');
const secretKey = process.env.secretKey;

const axios = require('axios');
const qs = require('querystring');
const request = require('request');

require('dotenv').config();

// Read host address, port, and DB from the environment
const PORT = process.env.PORT;
const HOST = process.env.HOST;

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

app.post('/api/webhook', async (req, res) => {
  console.log('🎉 We got an order!')

  // We'll compare the hmac to our own hash
  const hmac = req.get('X-Shopify-Hmac-Sha256')

  // Use raw-body to get the body (buffer)
  const body = await getRawBody(req)
  const newOrder = JSON.parse(body.toString())
  //console.log(newOrder)

  try {
    const body = await getRawBody(req)
    const newOrder = JSON.parse(body.toString())
    //console.log(newOrder)
  } catch (e) {
    console.log('Something went wrong:')
    console.log(e)
  }

  // Create a hash using the body and our key
  const hash = crypto
    .createHmac('sha256', secretKey)
    .update(body, 'utf8', 'hex')
    .digest('base64')

  // Compare our hash to Shopify's hash
  if (hash === hmac) {
    // It's a match! All good
    console.log('🎉 Phew, it came from Shopify!')
    res.sendStatus(200)
  } else {
    // No match! This request didn't originate from Shopify
    console.log('👻 Danger! Not from Shopify!')
    res.sendStatus(403)
  }

  const config = {
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept' : 'application/json',
    'GSUID' : '158'
    }
  }
  const requestBody = {
    f: 'json',
    u: 'boxofheat',
    p: 'boX_oF_heaT.2019'
  }
  //Login and retrieve session_digest
  const login = 'https://clienti.grupposinergia.net/webservice/login';
  axios.post(login, qs.stringify(requestBody), config)
    .then(response => {
      //Store session_digest
      var session = [];
      session = response.data.session_digest;
      //Get order status
      const url = 'https://clienti.grupposinergia.net/webservice/logistics/insert_orders';
      const params = 'f=json&sd='+session+'';
      const authy = {
          sd: session,
          f: 'json'
      };
      //axios.post(url, qs.stringify(ourOrders), config)
      axios.post(url, params, newOrder, config)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log("API Error:" + error);
        throw error;
      })
      })
      .catch(error => {
        console.log("API Error:" + error);
        throw error;
      })
})

//lt --port 3000
app.listen(3000, () => console.log('Shopify webhook on port 3000!'))

fastify.listen(process.env.PORT || 5000, 'localhost', function (err) {
  if (err) throw err
  console.log(`Fastify server on ${fastify.server.address().port}!`)
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
