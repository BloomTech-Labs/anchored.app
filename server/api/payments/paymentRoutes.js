const express = require('express');
const stripe = require('./constants/stripe.js');
const users = require('../users/usersModel');
const payments = require('./paymentsModel');
const router = express.Router();
const { ensureAuthenticated } = require('../auth/docusign/dsMiddleware');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
};

router.get('/', (req, res) => {
  payments
    .find()
    .then(invoices => {
      res.status(200).json(invoices);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  payments
    .find(userId)
    .then(invoices => {
      res.status(200).json(invoices);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.post('/', ensureAuthenticated, (req, res) => {
  users
    .findByUserId(req.user.id)
    .then(user => {
      let user_id = String(user.id);
      stripe.charges
        .create(req.body)
        .then(invoice => {
          console.log('First', user_id);
          const { description, amount, currency } = invoice;
          payments
            .addInvoice({ user_id, description, amount, currency })
            .then(invoice => {
              console.log('Second', user_id);
              postStripeCharge(
                res.status(201).json({
                  user_id,
                  description,
                  amount,
                  currency,
                })
              );
            })
            .catch(err => {
              console.log('Error #3', err.message);
              res.status(500).json({ ErrorMessage: err.message });
            });
        })
        .catch(err => {
          console.log('ERROR', err.message);
          res.status(500).json({ ErrorMessage: err.message });
        });
    })
    .catch(err => {
      console.log('Error', err.message);
      res.status(500).json({ ErrorMessage: err.message });
    });
});

module.exports = router;
