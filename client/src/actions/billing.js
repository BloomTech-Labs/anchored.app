import axios from 'axios';

export const RETRIEVING_ALL_USER_INFO = 'RETRIEVING_ALL_USER_INFO';
export const RETRIEVED_ALL_USER_INFO = 'RETRIEVED_ALL_USER_INFO';

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
