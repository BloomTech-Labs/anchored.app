const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const moment = require('moment');

// function checkToken(req, res, next) {
//   if (req.query.eg) {
//     req.session.eg = req.query.eg; // Save the requested example number
//   }
//   let tokenBufferMin = 30,
//     now = moment();
//   if (
//     tokenBufferMin &&
//     req.user &&
//     req.user.accessToken &&
//     now.add(tokenBufferMin, 'm').isBefore(req.user.expires)
//   ) {
//     console.log('\nUsing existing access token.');
//     next();
//   } else {
//     console.log('\nGet a new access token.');
//     res.redirect('/auth');
//   }
// }

module.exports = server => {
  server.use(
    express.json(),
    cors(),
    helmet(),
    session({
      secret: '927502af-6698-4fc1-8a04-273a28d00fd3',
      saveUninitialized: true,
      resave: true,
    }),
    passport.initialize(),
    passport.session()
  );
};
