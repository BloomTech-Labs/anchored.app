const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');

module.exports = server => {
  server.use(
    express.json(),
    cors({
      origin: process.env.ORIGIN || 'http://localhost:3000',
      credentials: true,
    }),
    helmet(),
    session({
      secret: process.env.DOCUSIGN_CLIENT_SECRET,
      saveUninitialized: true,
      resave: true,
    }),
    passport.initialize(),
    passport.session()
  );
};
