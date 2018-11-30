import {
  RETRIEVING_ALL_USER_INFO,
  RETRIEVED_ALL_USER_INFO,
  RETRIEVING_INVOICE,
  RETRIEVED_INVOICE,
  ERROR,
} from '../actions/billing';

const initialState = {
  description: null,
  amount: null,
  currency: null,
  created_at: null,
  retrieving: false,
  retrieved: false,
  error: null,
  subscription: null,
  credits: 3,
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

    case RETRIEVING_INVOICE:
      return {
        ...state,
        retrieving: true,
        retrieved: false,
      };

    case RETRIEVED_INVOICE:
      return {
        ...state,
        retrieving: true,
        retrieved: false,
        description: action.payload.description,
        amount: action.payload.amount,
        currency: action.payload.currency,
        created_at: action.payload.created_at,
      };

    case ERROR:
      return {
        ...state,
        retrieving: false,
        retrieved: true,
        error: action.payload,
      };

    default:
      return state;
  }
};
