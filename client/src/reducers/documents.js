import {
  RETRIEVING_DOCUMENTS,
  RETRIEVED_DOCUMENTS,
  RETRIEVING_PROOF,
  RETRIEVED_PROOF,
  ERROR,
} from '../actions/documents';

const initialState = {
  documents: null,
  retrievingDoc: false,
  retrievedDoc: false,
  retrievingProof: false,
  retrievedProof: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVING_DOCUMENTS:
      return { ...state, retrievingDoc: true, retrievedDoc: false };

    case RETRIEVED_DOCUMENTS:
      return {
        ...state,
        retrievedDoc: true,
        retrievingDoc: false,
        documents: action.payload,
      };

    case RETRIEVING_PROOF:
      return { ...state, retrievingProof: true, retrievedProof: false };

    case RETRIEVED_PROOF:
      return {
        ...state,
        retrievedProof: true,
        retrievingProof: false,
      };

    case ERROR:
      return {
        ...state,
        retrievingDoc: false,
        retrievedDoc: false,
        retrievingProof: false,
        retrievedProof: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
