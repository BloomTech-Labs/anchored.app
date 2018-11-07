const express = require('express');

const passport = require('passport');
const docusign = require('docusign-esign');
const router = express.Router();

passport.use(
  new docusign.OAuthClient(
    {
      sandbox: true,
      clientID: '401e8466-e1f2-4615-b11b-21e95f46fa15',
      clientSecret: 'secret',
      callbackURL: 'http://localhost:9000' + '/auth/callback',
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

function dsLoginCB1(req, res, next) {
  passport.authenticate('docusign', { failureRedirect: '/auth' })(
    req,
    res,
    next
  );
}
function dsLoginCB2(req, res, next) {
  // console.log(
  //   `Received access_token: ${req.user.accessToken.substring(0, 15)}...`
  // );
  // console.log(
  //   `Expires at ${req.user.expires.format('dddd, MMMM Do YYYY, h:mm:ss a')}`
  // );
  // if (req.session.eg) {
  //   res.redirect('/auth/go');
  // } else {
  //   res.redirect('/');
  // }
}

function goPageController(req, res, next) {
  // getting the API client ready
  apiClient = new docusign.ApiClient();
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + req.user.accessToken);
  getDefaultAccountInfo(req.user.accounts);
  apiClient.setBasePath(baseUri);
  docusign.Configuration.default.setDefaultApiClient(apiClient);
  eg = req.session.eg;
  req.session.eg = false;
}

function dsPingController(req, res) {
  console.log('\nDocuSign PING received.');
  res.send();
}

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

router.get('/', (req, res, next) => {
  passport.authenticate('docusign')(req, res, next);
});

router.get('/go', goPageController);

router.get('/dsping', dsPingController);

router.get('/callback', [dsLoginCB1, dsLoginCB2]);

module.exports = router;
