import {
  RETRIEVING_ALL_USER_INFO,
  RETRIEVED_ALL_USER_INFO,
  ERROR,
} from '../actions/billing';

const initialState = {
  subscription: null,
  credits: 3,
  retrieving: false,
  retrieved: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVING_ALL_USER_INFO:
      return { ...state, retrieving: true, retrieved: false };

    case RETRIEVED_ALL_USER_INFO:
      return {
        ...state,
        retrieving: false,
        retrieved: true,
        subscription: action.payload.subscription,
        credits: action.payload.credits,
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
