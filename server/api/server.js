require('dotenv').config();
const express = require('express');
const applyGlobalMiddleware = require('../config/applyGlobalMiddleware.js');
const cors = require('cors');

const CORS_WHITELIST = require('./Stripe/constants/frontend.js');

const usersRoutes = require('./users/usersRoutes.js');
const docsRoutes = require('./documents/documentsRoutes.js');
const authRoutes = require('./auth/auth.js');
const paymentRoutes = require('./Stripe/payment.js');

const corsOptions = {
  origin: (origin, callback) =>
    CORS_WHITELIST.indexOf(origin) !== -1
      ? callback(null, true)
      : callback(new Error(`Not allowed by CORS`)),
};

// server
const server = express();

// middleware
applyGlobalMiddleware(server);
server.use(cors(corsOptions));
server.use(express.json());

// routes
server.get('/', (req, res) => {
  res.status(200).json({ SUCCESS: `Sanity check` });
});

server.use('/users', usersRoutes);
server.use('/documents', docsRoutes);
server.use('/auth', authRoutes);
server.use('/payment', paymentRoutes);

module.exports = server;
