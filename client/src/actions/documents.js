import axios from 'axios';

export const RETRIEVING_DOCUMENTS = 'RETRIEVING_DOCUMENTS';
export const RETRIEVED_DOCUMENTS = 'RETRIEVED_DOCUMENTS';

export const ERROR = 'ERROR';

export const getDocuments = () => {
  const promise = axios.get(
    process.env.REACT_APP_DOCUMENTS || 'http://localhost:9000/documents/all'
  );
  return dispatch => {
    dispatch({ type: RETRIEVING_DOCUMENTS });
    promise
      .then(res => dispatch({ type: RETRIEVED_DOCUMENTS, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};
