const docusignModel = require('./docusignModel');
const docusign = require('docusign-esign');

// Check if a user is logged in and return an error if not
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: 'You need to be logged in!' });
}

// Check if a user is logged in and redirect if not
function ensureAuthenticatedRedirect(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect(process.env.ORIGIN || 'http://localhost:3000');
}

async function updateUser(req, user_info) {
  try {
    // Find the users default account from docusign
    const default_account = user_info.accounts.find(acc => acc.is_default);
    const account_id = default_account.account_id;
    // Get accounts user is linked to from DB
    const account = await docusignModel.findAllByAccount(account_id);
    const user_accounts = await docusignModel.findAllByUser(req.user.id);

    // Checks if user is somehow linked to more than one account / unlinks him
    if (user_accounts.length > 0) {
      for (let i = 0; i < user_accounts.length; i++) {
        const id = user_accounts[i].id;
        docusignModel.updateInfo(id, { user_id: null });
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

    // If the docusign account isn't in the DB then add one, otherwise update it
    if (account.length === 0) {
      await docusignModel.addInfo(info);
    } else {
      await docusignModel.updateInfo(info.id, info);
    }

    // Add docusign info to session
    const session_info = {
      access_token: info.access_token,
      refresh_token: info.refresh_token,
      token_expiration: info.token_expiration,
      base_uri: info.base_uri,
      account_id,
    };

    if (account.length > 0) {
      session_info.document_expiration = account[0].document_expiration;
    }

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

module.exports = {
  ensureAuthenticated,
  ensureAuthenticatedRedirect,
  updateUser,
  getDSApi,
};
