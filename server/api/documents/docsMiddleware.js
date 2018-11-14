const moment = require('moment');
const axios = require('axios');
const users = require('../users/usersModel');

function handleExpiration(req, res, next) {
  let header = {
    headers: { Authorization: 'Basic ' + process.env.DOCUSIGN_BASE64 },
  };

  let data = {
    grant_type: 'refresh_token',
    refresh_token: req.user.refresh_token,
  };

  axios
    .post('https://account-d.docusign.com/oauth/token', data, header)
    .then(response => {
      let expiration = moment().add(response.data.expires_in, 's');
      req.user.access_token = response.data.access_token;
      req.user.refresh_token = response.data.refresh_token;
      req.user.token_expiration = JSON.stringify(expiration);
      req.session.save();
      users.updateUser(req.user.id, req.user).catch(err => console.log(err));
      next();
    })
    .catch(err => res.status(401).json({ ErrorMessage: err.response.data }));
}

function checkExpiration(req, res, next) {
  if (moment().isAfter(JSON.parse(req.user.document_expiration))) {
    req.user.document_expiration = JSON.stringify(moment().add(15, 'm'));
    req.session.save();
    users.updateUser(req.user.id, req.user).catch(err => console.log(err));
    return next();
  }
  return res.status(400).json({ error: '15 minutes not up' });
}

function checkToken(req, res, next) {
  let expiration = JSON.parse(req.user.token_expiration);
  let now = moment();

  if (req.user.access_token && now.add(100000, 'm').isBefore(expiration)) {
    return next();
  } else if (!req.user.access_token || !req.user.refresh_token) {
    return res.status(401).json({ message: 'You need to be logged in!' });
  } else {
    return handleExpiration(req, res, next);
  }
}

module.exports = { checkExpiration, checkToken };
