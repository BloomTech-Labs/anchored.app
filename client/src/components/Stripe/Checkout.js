import React from 'react';
import { Button } from './styles/BuyStyles.js';
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from './constants/stripe';

const CURRENCY = 'USD';

const fromDollarToCent = amount => amount * 100;

const CheckoutCredit = ({
  name,
  description,
  amount,
  color,
  onToken,
  btnDescription,
}) => (
  <StripeCheckout
    name={name}
    description={description}
    amount={fromDollarToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHABLE}
  >
    <Button outline color={color}>
      {btnDescription}
    </Button>
  </StripeCheckout>
);

export { CheckoutCredit };
