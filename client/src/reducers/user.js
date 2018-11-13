import {
  RETRIEVING_USER_INFO,
  RETRIEVED_USER_INFO,
  ERROR,
} from '../actions/user';

const initialState = {
  user: null,
  retrieving: false,
  retrieved: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVING_USER_INFO:
      return { ...state, retrieving: true, retrieved: false };

    case RETRIEVED_USER_INFO:
      return {
        ...state,
        retrieved: true,
        retrieving: false,
        user: action.payload.user,
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
