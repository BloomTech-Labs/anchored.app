const users = require('../../users/usersModel');
const docusignModel = require('./docusignModel');
const docusign = require('docusign-esign');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: 'You need to be logged in!' });
}

async function updateUser(req, user_info) {
  try {
    const default_account = user_info.accounts.find(acc => acc.is_default);
    const account_id = default_account.account_id;
    const account = await docusignModel.findAllByAccount(account_id);
    const user_accounts = await docusignModel.findAllByUser(req.user.id);

    if (user_accounts.length > 0) {
      for (let i = 0; i < user_accounts.length; i++) {
        const id = user_accounts[i].id;
        docusignModel.updateUser(id, { user_id: null });
      }
    }

    const info = {
      id: default_account.account_id,
      user_id: req.user.id,
      access_token: user_info.accessToken,
      refresh_token: user_info.refreshToken,
      token_expiration: JSON.stringify(user_info.expires),
      base_uri: default_account.base_uri,
    };

    if (account.length === 0) {
      await docusignModel.addInfo(info);
    } else {
      await docusignModel.updateInfo(info.id, info);
    }

    const session_info = {
      access_token: info.access_token,
      refresh_token: info.refresh_token,
      token_expiration: info.token_expiration,
      base_uri: info.base_uri,
      document_expiration: account[0].document_expiration,
      account_id,
    };

    req.session.passport.user = { ...req.user, ...session_info };
    req.session.save();
  } catch (err) {
    console.log(err);
  }
}

function getDSApi(user) {
  // Sets up headers / users base_uri for the api to use
  const apiClient = new docusign.ApiClient();
  apiClient.addDefaultHeader('Authorization', 'Bearer ' + user.access_token);
  apiClient.setBasePath(`${user.base_uri}/restapi`);
  docusign.Configuration.default.setDefaultApiClient(apiClient);
  return apiClient;
}

module.exports = { ensureAuthenticated, updateUser, getDSApi };
