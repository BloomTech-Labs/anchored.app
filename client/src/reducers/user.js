import {
  RETRIEVING_USER_INFO,
  RETRIEVED_USER_INFO,
  UPDATED_IMAGE,
  UPDATING_IMAGE,
  ERROR,
} from '../actions/user';
import { RETRIEVING_CREDIT, RETRIEVED_CREDIT } from '../actions/billing';
import { INCREMENT_CREDIT, DECREMENT_CREDIT } from '../actions/user';

const initialState = {
  user: null,
  retrieving: false,
  retrieved: false,
  retrievingCred: false,
  retrievedCred: false,
  updatedPicture: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case RETRIEVING_USER_INFO:
      return { ...state, retrieving: true, retrieved: false };

    case RETRIEVED_USER_INFO: {
      return {
        ...state,
        retrieved: true,
        retrieving: false,
        user: action.payload.user,
      };
    }

    case RETRIEVING_CREDIT: {
      return { ...state, retrievingCred: true, retrievedCred: false };
    }

    case RETRIEVED_CREDIT: {
      const user = {
        ...state.user,
        credits: (state.user.credits += action.payload),
      };
      return { ...state, retrievingCred: false, retrievedCred: true, user };
    }

    case DECREMENT_CREDIT: {
      const user = {
        ...state.user,
        credits: --state.user.credits,
      };
      return { ...state, user };
    }

    case INCREMENT_CREDIT: {
      const user = {
        ...state.user,
        credits: ++state.user.credits,
      };
      return { ...state, user };
    }

    case UPDATING_IMAGE: {
      return { ...state };
    }

    case UPDATED_IMAGE: {
      const user = {
        ...state.user,
        uploaded_picture: action.payload,
      };
      return { ...state, user, updatedPicture: true };
    }

    case ERROR: {
      return {
        ...state,
        retrieving: false,
        retrieved: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};
