const express = require('express');
const router = require('../api/login/routes/login.route.js');
const routes = express.Router();

routes.use('/', router)

module.exports = routes
