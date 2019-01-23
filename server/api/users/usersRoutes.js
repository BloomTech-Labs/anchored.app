const express = require('express');
const users = require('./usersModel.js');
const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');

const router = express.Router();

router.get('/profile', async (req, res) => {
  let user;
  if (req.isAuthenticated()) {
    try {
      user = await users.findByUserId(req.user.id);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  res.status(200).json({ user });
});

router.use(ensureAuthenticated);

// Adds new user uploaded image
router.put('/image', (req, res) => {
  const uploaded_picture = req.body;
  users
    .updateUser(req.user.id, uploaded_picture)
    .then(picture => {
      req.user.uploaded_picture = uploaded_picture.uploaded_picture;
      req.session.save();
      res.status(201).json(picture);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.get('/subscription', (req, res) => {
  res
    .status(200)
    .json({ subscription: req.user.subscription, credits: req.user.credits });
});

module.exports = router;
