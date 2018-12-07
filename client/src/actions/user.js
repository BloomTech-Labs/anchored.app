import axios from 'axios';

export const RETRIEVING_USER_INFO = 'RETRIEVING_USER_INFO';
export const RETRIEVED_USER_INFO = 'RETRIEVED_USER_INFO';

export const UNLINKING_USER = 'UNLINKING_USER';
export const UNLINKED_USER = 'UNLINKED_USER';

export const DECREMENT_CREDIT = 'DECREMENT_CREDIT';
export const INCREMENT_CREDIT = 'INCREMENT_CREDIT';

export const ERROR = 'ERROR';

export const getUserInfo = () => {
  const promise = axios.get(
    process.env.REACT_APP_USERS_PROFILE || 'http://localhost:9000/users/profile'
  );
  return dispatch => {
    dispatch({ type: RETRIEVING_USER_INFO });
    promise
      .then(res => dispatch({ type: RETRIEVED_USER_INFO, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err.message }));
  };
};

export const unlinkUser = () => {
  const route =
    process.env.REACT_APP_DOCUSIGN_LOGOUT ||
    'http://localhost:9000/auth/docusign/logout';
  const promise = axios.get(route);

  return dispatch => {
    dispatch({ type: UNLINKING_USER });
    promise
      .then(() => {
        dispatch({ type: UNLINKED_USER });
        window.location.reload();
      })
      .catch(err => dispatch({ type: ERROR, payload: err.message }));
  };
};
