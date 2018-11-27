const express = require('express');
const stripe = require('./constants/stripe.js');
const users = require('../users/usersModel');
const router = express.Router();

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.get('/', (req, res) => {});

router.post('/', (req, res) => {
  console.log('Info given', res);
  stripe.charges.create(req.body, postStripeCharge(res));
});

module.exports = router;
