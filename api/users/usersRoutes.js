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

module.exports = router;
