const boom = require('@hapi/boom')
const Articles = require('../models/Articles');
const axios = require('axios');
const qs = require('querystring');
const request = require('request');
const fetch = require('node-fetch');
global.Headers = fetch.Headers;

// Get all articles
exports.getArticles = async () => {
  try {
    const articles = await Articles.find();
    return articles;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Get single articles by ID
exports.getSingleArticles = async (req) => {
  try {
    const { id } = req.params;
    const articles = await Articles.findById(id);
    return articles;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Add a new articles
exports.addArticles = async (req) => {
  const { body } = req;
  try {
    const articles = new Articles(body);
    return articles.save();
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Update an existing articles
exports.updateArticles = async (req) => {
  try {
    const { body: updateData } = req;
    const { id } = req.params;
    const articles = await Articles.findByIdAndUpdate(id, updateData, { new: true });
    return articles;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Delete a articles
exports.deleteArticles = async (req) => {
  try {
    const { id } = req.params;
    const articles = await Articles.findByIdAndRemove(id);
    return articles;
  } catch (err) {
    throw boom.boomify(err);
  }
};

// Insert articles
exports.insertArticles = async (req, res) => {
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
  const login = 'https://clienti.grupposinergia.net/webservice/login';

  axios.post(login, qs.stringify(requestBody), config)
    .then(response => {
      //Store session_digest
      var session = [];
      session = response.data.session_digest;
      //Get order status
      const url = 'https://clienti.grupposinergia.net/webservice/logistics/insert_articles';
      const articles = {
          sku: 'ABOH2390',
          company_code: 'XY',
          descr: 'Articles for new orders.',
          sd: session,
          f: 'json'
      };
      axios.post(url, qs.stringify(articles), config)
      .then(response => {
        console.log(response);
        return res.send(response);
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
