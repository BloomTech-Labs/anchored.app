import {
  RETRIEVING_ENVELOPES,
  RETRIEVED_ENVELOPES,
  RETRIEVING_PROOF,
  RETRIEVED_PROOF,
  ERROR,
} from '../actions/envelopes';

const initialState = {
  envelopes: null,
  retrievingEnv: false,
  retrievedEnv: false,
  retrievingProof: false,
  retrievedProof: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVING_ENVELOPES:
      return { ...state, retrievingEnv: true, retrievedEnv: false };

    case RETRIEVED_ENVELOPES:
      return {
        ...state,
        retrievedEnv: true,
        retrievingEnv: false,
        envelopes: action.payload,
      };

    case RETRIEVING_PROOF:
      return {
        ...state,
        retrievingProof: true,
        retrievedProof: false,
      };

    case RETRIEVED_PROOF:
      const index = state.envelopes.findIndex(env => {
        return env.id === action.payload.id;
      });
      state.envelopes[index].waiting = true;
      return {
        ...state,
        retrievedProof: true,
        retrievingProof: false,
      };

    case ERROR:
      return {
        ...state,
        retrievingEnv: false,
        retrievedEnv: false,
        retrievingProof: false,
        retrievedProof: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
