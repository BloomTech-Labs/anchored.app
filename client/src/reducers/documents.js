import {
  RETRIEVING_DOCUMENTS,
  RETRIEVED_DOCUMENTS,
  ERROR,
} from '../actions/documents';

const initialState = {
  documents: null,
  retrieving: false,
  retrieved: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVING_DOCUMENTS:
      return { ...state, retrieving: true, retrieved: false };

    case RETRIEVED_DOCUMENTS:
      return {
        ...state,
        retrieved: true,
        retrieving: false,
        documents: action.payload,
      };

    case ERROR:
      return {
        ...state,
        retrieving: false,
        retrieved: false,
        error: action.payload,
      };

    default:
      return state;
  }
};