const users = require('../../users/usersModel');
const docusignModel = require('../../auth/docusign/docusignModel');

async function userPostCheck(user) {
  const { given_name, family_name, nickname, email, sub, picture } = user;

  if (!sub) {
    return;
  }

  const id = sub.split('|')[1];

  let new_user = {};

  new_user = await users.findByUserId(id);

  if (new_user) {
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
