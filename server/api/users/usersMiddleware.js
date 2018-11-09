const users = require('./usersModel.js');

function userPostCheck(req, res, next) {
  const { given_name, family_name, nickname, email, sub } = req.body;

  if (!email || !sub) {
    return res.status(400).json({ message: 'No email or user ID found' });
  }

  const user_id = sub.split('|')[1];

  users
    .find()
    .then(users => {
      // loop through users and check if user has already been created, otherwise create user
      let created = false;
      users.forEach(user => {
        user.user_id == user_id ? (created = true) : null;
      });
      if (created) return;
      req.user = {
        first_name: given_name,
        last_name: family_name,
        username: nickname,
        email,
        user_id,
      };
      next();
    })
    .catch(err => {
      res.status(500).json(err.message);
      next();
    });
}

module.exports = { userPostCheck };
