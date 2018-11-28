import axios from 'axios';

export const RETRIEVING_DOCUMENTS = 'RETRIEVING_DOCUMENTS';
export const RETRIEVED_DOCUMENTS = 'RETRIEVED_DOCUMENTS';

export const RETRIEVING_PROOF = 'RETRIEVING_PROOF';
export const RETRIEVED_PROOF = 'RETRIEVED_PROOF';

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

export const getProof = id => {
  const promise = axios.get(
    process.env.REACT_APP_DOCUMENTS ||
      `http://localhost:9000/documents/${id}/proof`
  );
  return dispatch => {
    dispatch({ type: RETRIEVING_PROOF });
    promise
      .then(res => dispatch({ type: RETRIEVED_PROOF, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};
