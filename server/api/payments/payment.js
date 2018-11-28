const express = require('express');
const stripe = require('./constants/stripe.js');
const users = require('../users/usersModel');
const payments = require('./paymentsModel');
const router = express.Router();
const { getMetaData } = require('./paymentsMiddleWare');

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

router.post('/', (req, res) => {
  stripe.charges
    .create(req.body)
    .then(invoice => {
      payments
        .addInvoice(invoice)
        .then(invoice => {
          console.log(invoice);
          postStripeCharge(
            res.status(201).json({
              description: invoice.description,
              amount: invoice.amount,
              currency: invoice.currency,
            })
          );
        })
        .catch(err => {
          res.status(500).json({ ErrorMessage: err.message });
        });
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

module.exports = router;
