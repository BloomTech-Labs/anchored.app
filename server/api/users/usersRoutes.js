const express = require('express');
const users = require('./usersModel.js');
const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

// route is /users
router.get('/', (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get('/profile', (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get('/subscription', (req, res) => {
  res
    .status(200)
    .json({ subscription: req.user.subscription, credits: req.user.credits });
});

router.get('/id/:id', (req, res) => {
  const { id } = req.params;
  users
    .findByUserId(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: `No user found to get, by the supplied user ID.` });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;

  users
    .updateUser(id, user)
    .then(userUpdatedCount => {
      if (userUpdatedCount > 0) {
        res.status(200).json(userUpdatedCount);
      } else {
        res.status(404).json({
          message: `No user found to update, by the supplied user ID; or user was not supplied.`,
        });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  users
    .removeUser(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({
          message: `No user found to remove, by the supplied username.`,
        });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

module.exports = router;
