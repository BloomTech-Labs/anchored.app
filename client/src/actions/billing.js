import axios from 'axios';

export const RETRIEVING_ALL_USER_INFO = 'RETRIEVING_ALL_USER_INFO';
export const RETRIEVED_ALL_USER_INFO = 'RETRIEVED_ALL_USER_INFO';

export const RETRIEVING_INVOICE = 'RETRIEVING_INVOICE';
export const RETRIEVED_INVOICE = 'RETRIEVED_INVOICE';

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
