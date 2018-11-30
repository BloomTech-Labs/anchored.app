import React from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';
import StripeCheckout from 'react-stripe-checkout';
// import logo from '../../images/proofdlogocheckout.png';
import STRIPE_PUBLISHABLE from './constants/stripe';
import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const fromDollarToCent = amount => amount * 100;

const successPayment = data => {
  axios
    .get(
      process.env.REACT_APP_URL_ONE_CREDIT_INCREMENT ||
        `http://localhost:9000/users/credits`
    )
    .then(res => {
      alert('Payment Successful');
    })
    .catch(err => {
      console.log(err.message);
    });
};

const errorPayment = data => {
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  axios
    .post(PAYMENT_SERVER_URL, {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDollarToCent(amount),
    })
    .then(successPayment)
    .catch(errorPayment);

const CheckoutCredit1 = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    // image={logo}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  >
    <Button outline color="primary">
      1 Credit
    </Button>
  </StripeCheckout>
);

const CheckoutCredit3 = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    // image={logo}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  >
    <Button outline color="success">
      3 Credits
    </Button>
  </StripeCheckout>
);

const CheckoutCredit5 = ({ name, description, amount }) => (
  <StripeCheckout
    name={name}
    // image={logo}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  >
    <Button outline color="danger">
      5 Credits
    </Button>
  </StripeCheckout>
);

export { CheckoutCredit1, CheckoutCredit3, CheckoutCredit5 };
