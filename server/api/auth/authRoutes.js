const express = require('express');

const moment = require('moment');
const passport = require('passport');
const docusign = require('docusign-esign');

const router = express.Router();

passport.use(
  new docusign.OAuthClient(
    {
      sandbox: true,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3333' + '/auth/callback',
      state: true,
    },
    (accessToken, refreshToken, params, user, done) => {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      user.expiresIn = params.expires_in;
      user.expires = moment().add(user.expiresIn, 's');
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

function checkToken(req, res, next) {
  if (req.query.eg) {
    req.session.eg = req.query.eg;
  }

  let tokenBufferMin = 30;
  let now = moment();

  if (
    tokenBufferMin &&
    req.user &&
    req.user.accessToken &&
    now.add(tokenBufferMin, 'm').isBefore(req.user.expires)
  ) {
    next();
  } else {
    res.redirect('/auth');
  }
}

router.get('/', passport.authenticate('docusign'));

router.get(
  '/callback',
  passport.authenticate('docusign', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: '/auth',
  })
);

router.use(checkToken);

module.exports = router;
