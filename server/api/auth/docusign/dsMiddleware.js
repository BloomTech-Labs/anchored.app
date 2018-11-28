const users = require('../../users/usersModel');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  console.log('User not logged in');
  return res.status(401).json({ message: 'You need to be logged in!' });
}

function updateUser(req, user_info) {
  const default_account = user_info.accounts.find(acc => acc.is_default);
  const new_user = {
    access_token: user_info.accessToken,
    refresh_token: user_info.refreshToken,
    token_expiration: JSON.stringify(user_info.expires),
    base_uri: default_account.base_uri,
    account_id: default_account.account_id,
  };
  req.session.passport.user = { ...req.user, ...new_user };
  req.session.save();
  users.updateUser(req.user.id, new_user).catch(err => console.log(err));
}

module.exports = { ensureAuthenticated, updateUser };
