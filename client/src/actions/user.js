import axios from 'axios';

export const RETRIEVING_USER_INFO = 'RETRIEVING_USER_INFO';
export const RETRIEVED_USER_INFO = 'RETRIEVED_USER_INFO';

export const UPDATING_IMAGE = 'UPDATING_IMAGE';
export const UPDATED_IMAGE = 'UPDATED_IMAGE';

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

export const newProfileImage = uploaded_picture => {
  const promise = axios.put(
    process.env.REACT_APP_UPLOAD_IMAGE || 'http://localhost:9000/users/image',
    {
      uploaded_picture,
    }
  );
  return dispatch => {
    dispatch({ type: UPDATING_IMAGE });
    promise
      .then(res => dispatch({ type: UPDATED_IMAGE, payload: uploaded_picture }))
      .catch(err => dispatch({ type: ERROR, payload: err.message }));
  };
};
