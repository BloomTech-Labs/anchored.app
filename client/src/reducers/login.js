import { LOGGING_IN, SET_USERNAME, SET_PASSWORD } from '../actions/login';

const initialState = {
  username: '',
  password: '',
  loggingIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN:
      return { ...state, loggingIn: true };

    case SET_USERNAME:
      return { ...state, username: action.payload };

    case SET_PASSWORD:
      return { ...state, password: action.payload };

    default:
      return state;
  }
};
