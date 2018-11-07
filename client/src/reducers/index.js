import { combineReducers } from 'redux';
import register from './register';
import login from './login';

const rootReducer = combineReducers({
  register,
  login,
});

export default rootReducer;
