const express = require('express');
const routes = express.Router();
const homeController = require('../controllers/home_controller');


console.log('Router loaded');

routes.get('/', homeController.home);

module.exports = routes;