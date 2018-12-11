import {
  RETRIEVING_ENVELOPES,
  RETRIEVED_ENVELOPES,
  RETRIEVING_PROOF,
  RETRIEVED_PROOF,
  ERROR,
  UPDATE_LOADING,
} from '../actions/envelopes';

import { UNLINKING_USER, UNLINKED_USER } from '../actions/user';

const initialState = {
  envelopes: null,
  retrievingEnv: false,
  retrievedEnv: false,
  retrievingProof: false,
  retrievedProof: false,
  unlinking: false,
  unlinked: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVING_ENVELOPES:
      return { ...state, retrievingEnv: true, retrievedEnv: false };

    case RETRIEVED_ENVELOPES: {
      return {
        ...state,
        retrievedEnv: true,
        retrievingEnv: false,
        envelopes: action.payload,
      };
    }

    case RETRIEVING_PROOF: {
      const envelopes = state.envelopes.slice();
      const index = envelopes.findIndex(env => env.id === action.payload);
      envelopes[index].loading = true;
      return {
        ...state,
        retrievingProof: true,
        retrievedProof: false,
        envelopes,
      };
    }

    case RETRIEVED_PROOF: {
      const envelopes = state.envelopes.slice();
      const index = envelopes.findIndex(env => env.id === action.payload.id);
      envelopes[index].waiting = true;
      envelopes[index].loading = false;
      envelopes[index].verified_proof = action.payload.verified_proof;
      return {
        ...state,
        retrievingProof: false,
        retrievedProof: true,
        envelopes,
      };
    }

    case UPDATE_LOADING: {
      const envelopes = state.envelopes.slice();
      const index = envelopes.findIndex(env => env.id === action.payload.id);
      envelopes[index].loading = action.payload.changes.loading;
      envelopes[index].waiting = action.payload.changes.waiting;
      return { ...state, envelopes };
    }

    case UNLINKING_USER: {
      return { ...state, unlinking: true, unlinked: false };
    }

    case UNLINKED_USER: {
      return { ...state, unlinking: false, unlinked: true, envelopes: null };
    }

    case ERROR: {
      let envelopes = state.envelopes;
      if (envelopes) {
        envelopes = state.envelopes.slice();
        if (action.payload && action.payload.data && action.payload.data.id) {
          const id = action.payload.data.id;
          const index = envelopes.findIndex(env => env.id === Number(id));
          envelopes[index].loading = false;
          envelopes[index].error = true;
        }
      }

      return {
        ...state,
        retrievingEnv: false,
        retrievedEnv: false,
        retrievingProof: false,
        retrievedProof: false,
        unlinking: false,
        unlinked: false,
        envelopes,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};
