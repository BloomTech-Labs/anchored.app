const express = require('express');

const moment = require('moment');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const { userPostCheck } = require('./auth0Middleware');
const router = express.Router();

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL:
        process.env.AUTH0_CALLBACK_URL ||
        'http://localhost:9000/auth/auth0/callback',
    },
    async (accessToken, refreshToken, params, user, done) => {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      user.expiresIn = params.expires_in;
      user.expires = moment().add(user.expiresIn, 's');
      let profile;
      try {
        profile = await userPostCheck(user._json);
        return done(null, profile);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get(
  '/callback',
  passport.authenticate('auth0', {
    successRedirect: process.env.AUTH0_REDIRECT_URL || 'http://localhost:3000',
    failureRedirect: process.env.AUTH0_REDIRECT_URL || 'http://localhost:3000',
  })
);

// Perform session logout
router.get('/logout', (req, res) => {
  req.session.destroy(function(err) {
    req.logout();
    res.sendStatus(200);
  });
});

module.exports = router;
