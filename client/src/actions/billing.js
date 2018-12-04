import axios from 'axios';

import PAYMENT_SERVER_URL from '../components/Stripe/constants/server';

export const RETRIEVING_ALL_USER_INFO = 'RETRIEVING_ALL_USER_INFO';
export const RETRIEVED_ALL_USER_INFO = 'RETRIEVED_ALL_USER_INFO';

export const RETRIEVING_INVOICE = 'RETRIEVING_INVOICE';
export const RETRIEVED_INVOICE = 'RETRIEVED_INVOICE';

export const RETRIEVING_CREDIT = 'RETRIEVING_CREDIT';
export const RETRIEVED_CREDIT = 'RETRIEVED_CREDIT';

export const ERROR = 'ERROR';

export const getAllUserInfo = () => {
  const promise = axios.get(
    process.env.REACT_APP_USERS_INFO ||
      'http://localhost:9000/users/subscription'
  );
  return dispatch => {
    dispatch({ type: RETRIEVING_ALL_USER_INFO });
    promise
      .then(res =>
        dispatch({
          type: RETRIEVED_ALL_USER_INFO,
          payload: res.data,
        })
      )
      .catch(err => dispatch({ type: ERROR, payload: err.message }));
  };
};

export const getUserInvoice = () => {
  const promise = axios.get(
    process.env.REACT_APP_USERS_INVOICE || 'http://localhost:9000/payment/'
  );

  return dispatch => {
    dispatch({ type: RETRIEVING_INVOICE });
    promise
      .then(res =>
        dispatch({
          type: RETRIEVED_INVOICE,
          payload: res.data,
        })
      )
      .catch(err => dispatch({ type: ERROR, payload: err.message }));
  };
};

const errorPayment = () => {
  alert(
    'There was an error processing your payment. Please contact customer support.'
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
