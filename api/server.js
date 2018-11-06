const express = require('express');
const applyGlobalMiddleware = require('../config/applyGlobalMiddleware.js');
const usersRoutes = require('./users/usersRoutes.js');
const locationRoutes = require('./locations/locationsRoutes.js');

// server
const server = express();

// middleware
applyGlobalMiddleware(server);

// routes
server.use('/', usersRoutes);
server.use('/', locationRoutes);

module.exports = server;
