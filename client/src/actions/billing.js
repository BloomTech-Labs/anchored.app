import axios from 'axios';

import PAYMENT_SERVER_URL from '../components/Stripe/constants/server';

export const RETRIEVING_CREDIT = 'RETRIEVING_CREDIT';
export const RETRIEVED_CREDIT = 'RETRIEVED_CREDIT';

export const ERROR = 'ERROR';

const errorPayment = () => {
  alert(
    'There was an error processing your payment. Please contact us at support@anchored.app.'
  );
};

export const onToken = (amount, description) => dispatch => token => {
  const fromDollarToCent = amount => amount * 100;
  const CURRENCY = 'USD';
  const promise = axios.post(PAYMENT_SERVER_URL, {
    description,
    source: token.id,
    currency: CURRENCY,
    amount: fromDollarToCent(amount),
  });

  dispatch({ type: RETRIEVING_CREDIT });
  promise
    .then(() => {
      let credit_add = description;
      let credit_split = credit_add.split('');
      let filterCredits = credit_split.filter(numStr => {
        return /^[1,3,5]/.test(numStr);
      });
      dispatch({ type: RETRIEVED_CREDIT, payload: Number(filterCredits) });
    })
    .catch(() => {
      errorPayment();
      dispatch({ type: ERROR });
    });
};
