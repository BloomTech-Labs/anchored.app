const users = require('../../users/usersModel');
const moment = require('moment');

async function userPostCheck(user) {
  const { given_name, family_name, nickname, email, sub } = user;

  if (!sub) {
    return;
  }

  const id = sub.split('|')[1];

  let new_user = {};

  new_user = await users.findByUserId(id);

  if (new_user) return new_user;

  new_user = {
    id,
    document_expiration: 0,
    token_expiration: 0,
    first_name: given_name,
    last_name: family_name,
    username: nickname,
    email,
  };

  users.addUser(new_user).catch(err => console.log(err));

  return new_user;
}

module.exports = { userPostCheck };
