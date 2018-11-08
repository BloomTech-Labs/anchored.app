const express = require('express');
const passport = require('passport');
const passportAuth0 = require('passport-auth0');
const session = require('session');

const router = express.Router();

let config = new passportAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL:
    process.env.AUTH0_CALLBACK_URL || 'http://localhost:3333/auth/callback',

  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  },
});

passport.use(config);

router.get('/', passport.authenticate('auth0'));

router.get('/callback', (req, res, next) => {
  passport.authenticate('auth0', (err, user, info) => {
    if (!user) {
      return res.redirect('/');
    }
  });
});

router.get('/', (req, res) => {
  req.logout();
  req.redirect('/');
});

module.exports = router;
