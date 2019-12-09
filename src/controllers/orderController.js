const boom = require('@hapi/boom');
const Order = require('../models/Order');
const axios = require('axios');
const qs = require('querystring');
const request = require('request');
const fetch = require('node-fetch');
global.Headers = fetch.Headers;

// Get all order
exports.getOrder = async () => {
  try {
    const order = await Order.find();
    return order;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single order by ID
exports.getSingleOrder = async (req) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    return order;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new order
exports.addOrder = async (req) => {
  const { body } = req;
  try {
    const order = new Order(body);
    return order.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing order
exports.updateOrder = async (req) => {
  try {
    const { body: updateData } = req;
    const { id } = req.params;
    const order = await Order.findByIdAndUpdate(id, updateData, { new: true });
    return order;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a order
exports.deleteOrder = async (req) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndRemove(id);
    return order;
  } catch (err) {
    throw boom.boomify(err);
  }
};

//Read Orders Status
exports.ordersStatus = async (req, res) => {
  //Order Status from endpoint
  //Define headers and login
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
  // const requestBody = 'f=json&u=boxofheat&p=boX_oF_heaT.2019';
  const login = 'https://clienti.grupposinergia.net/webservice/login';
  axios.post(login, qs.stringify(requestBody), config)
    .then((response) => {
      //Store session_digest
      var session = [];
      session = response.data.session_digest;
      //Get order status
      const url = 'https://clienti.grupposinergia.net/webservice/logistics/orders_status';
      const params = 'f=json&sd='+session+'&c=XY';
      axios.get(url+'?'+ params, config)
      .then((response) => {
        //Get orders
        var ordersStatus = [];
        ordersStatus = response.data;
        //Log response
        console.log(ordersStatus)
        res.send(ordersStatus);
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
};

//Read Order Status
//Test Order ID: 1950896259150
//Test Order #: 1451
exports.orderStatus = async (req, res) => {
  //Order Status from endpoint
  //Define headers and login
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
  // const requestBody = 'f=json&u=boxofheat&p=boX_oF_heaT.2019';
  const login = 'https://clienti.grupposinergia.net/webservice/login';

  axios.post(login, qs.stringify(requestBody), config)
    .then(response => {
      //Store session_digest
      var session = [];
      session = response.data.session_digest;
      //Get order status
      const url = 'https://clienti.grupposinergia.net/webservice/logistics/order_status';
      const params = 'f=json&sd='+session+'&c=XY&o=1451';

      axios.post(url+'?'+ params, config)
      .then(response => {
        //Get orders
        var orderStatus = [];
        orderStatus = response.data;
        //Log response
        console.log(orderStatus)
        // return response.data;
        res.send(orderStatus);
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
};

//Insert orders
exports.insertOrders = async (req, res) => {

  //Order Status from endpoint
  //Define headers and login
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
  // const requestBody = 'f=json&u=boxofheat&p=boX_oF_heaT.2019';
  const login = 'https://clienti.grupposinergia.net/webservice/login';

  axios.post(login, qs.stringify(requestBody), config)
    .then(response => {
      //Store session_digest
      var session = [];
      session = response.data.session_digest;
      //Get order status
      const url = 'https://clienti.grupposinergia.net/webservice/logistics/insert_orders';
      const orders = {
          name: 'Mario',
          city: 'Milan',
          zip: '30318',
          sd: session,
          f: 'json'
      };

      axios.post(url, qs.stringify(orders), config)
      .then(response => {
        console.log(response.data);
        return res.send(response.data);
      })
      .catch(error => {
        console.log("API Error:" + error);
        return res.error(error);
      })
      })
      .catch(error => {
        console.log("API Error:" + error);
        throw error;
      })
};

//Insert orders doc
//file_name: name of the file, must be identical
//to the order id that it references
//Test Order ID: 1950896259150
exports.sendDoc = async () => {
  //Order Status from endpoint
  //Define headers and login
  const config = {
    headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept' : 'application/json',
    'GSUID' : '158'
    }
  }
  //Login and retrieve session_digest
  const requestBody = 'f=json&u=boxofheat&p=boX_oF_heaT.2019';
  const login = 'https://clienti.grupposinergia.net/webservice/login';
  axios.post(login, requestBody, config)
    .then((response) => {
      //Store session_digest
      var session = [];
      session = response.data.session_digest;
      //Get order status
      const url = 'https://clienti.grupposinergia.net/webservice/logistics/upload_file';
      const params = 'f=json&sd='+session+'&c=XY';
      return axios.get(url+'?'+ params, config);
    })
    .then((response) => {
      //Get orders
      var sendDoc = [];
      sendDoc = response.data;
      //Log response
      console.log(sendDoc)
    });
}
