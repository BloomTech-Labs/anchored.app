const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');

module.exports = server => {
  server.use(
    express.json(),
    cors(),
    helmet(),
    session({
      secret: process.env.CLIENT_SECRET,
      saveUninitialized: true,
      resave: true,
    }),
    passport.initialize(),
    passport.session()
  );
};
