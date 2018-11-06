import { REGISTERING, SET_USERNAME, SET_PASSWORD } from '../actions/register';

const initialState = {
  username: '',
  password: '',
  registering: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTERING:
      return { ...state, registering: true };

    case SET_USERNAME:
      return { ...state, username: action.payload };

    case SET_PASSWORD:
      return { ...state, password: action.payload };

    default:
      return state;
  }
};
