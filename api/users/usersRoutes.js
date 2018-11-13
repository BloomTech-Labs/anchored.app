const express = require('express');

const users = require('./usersModel.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ SUCCESS: `Sanity check` });
});

router.get('/users', (req, res) => {
  users
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.get('/users/:email', (req, res) => {
  const { email } = req.params;
  users
    .findByEmail(email)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: `No user found to get, by the supplied username.` });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.get('/users/id/:id', (req, res) => {
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

// TODO: Add POST endpoint, need to think about Auth0 user creation first.

router.put('/users/:id', (req, res) => {
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

router.delete('/users/:id', (req, res) => {
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
