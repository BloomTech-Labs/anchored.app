const express = require('express');
const applyGlobalMiddleware = require('../config/applyGlobalMiddleware.js');
const usersRoutes = require('./users/usersRoutes.js');

// server
const server = express();

// middleware
applyGlobalMiddleware(server);

// routes
server.use('/', usersRoutes);

module.exports = server;
