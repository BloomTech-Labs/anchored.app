const users = require('../../users/usersModel');
const docusignModel = require('../../auth/docusign/docusignModel');

/*
  Checks if a user has already been created and if so, it will grab the user from the db.
  Otherwise create a user with the info provided from auth0.
*/
async function userPostCheck(user) {
  const { given_name, family_name, nickname, email, sub, picture } = user;

  if (!sub) {
    return;
  }

  // Split sub to find id (auth0|234234234)
  const id = sub.split('|')[1];

  let new_user = {};

  new_user = await users.findByUserId(id);

  if (new_user) {
    // Checks if a user is linked with docusign and adds the info to the session
    const info = await docusignModel.findAllByUser(id);
    if (info.length > 0) {
      info[0].account_id = info[0].id;
      delete info[0].id;
      new_user = { ...new_user, ...info[0] };
    }
    return new_user;
  }

  new_user = {
    id,
    first_name: given_name,
    last_name: family_name,
    username: nickname,
    email,
    picture,
    credits: 3,
  };

  return await users
    .addUser(new_user)
    .then(() => new_user)
    .catch(err => err);
}

module.exports = { userPostCheck };
