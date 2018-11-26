const express = require('express');
const users = require('../../users/usersModel.js');
const moment = require('moment');
const passport = require('passport');
const docusign = require('docusign-esign');

const { ensureAuthenticated, updateUser } = require('./dsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

passport.use(
  new docusign.OAuthClient(
    {
      clientID: process.env.DOCUSIGN_CLIENT_ID,
      clientSecret: process.env.DOCUSIGN_CLIENT_SECRET,
      callbackURL:
        process.env.DOCUSIGN_CALLBACK_URL ||
        'http://localhost:9000/auth/docusign/callback',
      passReqToCallback: true,
      sandbox: true,
      state: true,
    },
    async (req, accessToken, refreshToken, params, user, done) => {
      user.accessToken = accessToken;
      user.refreshToken = refreshToken;
      user.expiresIn = params.expires_in;
      user.expires = moment().add(user.expiresIn, 's');
      await updateUser(req, user);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

router.get('/', passport.authorize('docusign'));

router.get(
  '/callback',
  passport.authorize('docusign', {
    failureRedirect: '/auth/docusign',
  }),
<<<<<<< HEAD
  //(req, res) => res.redirect('https://chainpoint-docusign.netlify.com/')
=======
>>>>>>> 251fadf817ef3219918c8b834939cfdc7fc48297
  (req, res) => res.redirect(process.env.ORIGIN || 'http://localhost:3000')
);

function clear(req, res, next) {
  users
    .updateUser(req.user.id, {
      account_id: null,
      token_expiration: null,
      document_expiration: null,
      base_uri: null,
      access_token: null,
      refresh_token: null,
    })
    .then(user => {
      req.logOut();
      req.session.destroy(function(err) {
        if (!err) {
          res
            .status(200)
            .clearCookie('connect.sid', { path: '/' })
            .json({ status: 'Success' });
        } else {
        }
      });
    });
}

router.get('/logout', clear, (req, res) => {
  res.redirect(process.env.ORIGIN || 'http://localhost:3000');
});

module.exports = router;
