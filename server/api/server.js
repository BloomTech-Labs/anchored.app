require('dotenv').config();
const express = require('express');
const applyGlobalMiddleware = require('../config/applyGlobalMiddleware.js');

const usersRoutes = require('./users/usersRoutes.js');
const docsRoutes = require('./documents/documentsRoutes.js');
const authRoutes = require('./auth/auth');

// server
const server = express();

// middleware
applyGlobalMiddleware(server);

server.use((req, res, next) => {
  console.log('WORKS');
  console.log(req.session);
  next();
});
// routes
server.get('/', (req, res) => {
  res.status(200).json({ SUCCESS: `Sanity check` });
});

server.use('/users', usersRoutes);
server.use('/documents', docsRoutes);
server.use('/auth', authRoutes);

module.exports = server;
