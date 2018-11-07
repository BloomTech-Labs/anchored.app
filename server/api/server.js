require('dotenv').config();
const express = require('express');
const applyGlobalMiddleware = require('../config/applyGlobalMiddleware.js');
const usersRoutes = require('./users/usersRoutes.js');
const authRoutes = require('./auth/authRoutes');

// server
const server = express();

// middleware
applyGlobalMiddleware(server);

// routes
server.use('/', usersRoutes);
server.use('/auth', authRoutes);

module.exports = server;
