import axios from 'axios';

export const RETRIEVING_ENVELOPES = 'RETRIEVING_ENVELOPES';
export const RETRIEVED_ENVELOPES = 'RETRIEVED_ENVELOPES';

export const RETRIEVING_PROOF = 'RETRIEVING_PROOF';
export const RETRIEVED_PROOF = 'RETRIEVED_PROOF';

export const ERROR = 'ERROR';

export const getEnvelopes = () => {
  const promise = axios.get(
    process.env.REACT_APP_ENVELOPES ||
      'https://cryptic-eyrie-27950.herokuapp.com/envelopes/all'
  );
  return dispatch => {
    dispatch({ type: RETRIEVING_ENVELOPES });
    promise
      .then(res => dispatch({ type: RETRIEVED_ENVELOPES, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};

export const getProof = id => {
  const promise = axios.get(
    process.env.REACT_APP_PROOF ||
      `https://cryptic-eyrie-27950.herokuapp.com/chainpoint/${id}`
  );
  return dispatch => {
    dispatch({ type: RETRIEVING_PROOF, payload: id });
    promise
      .then(res => dispatch({ type: RETRIEVED_PROOF, payload: res.data }))
      .catch(err => dispatch({ type: ERROR, payload: err }));
  };
};
