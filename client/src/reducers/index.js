import { combineReducers } from 'redux';
import user from './user';
import envelopes from './envelopes';
import billing from './billing';

const rootReducer = combineReducers({
  user,
  envelopes,
  billing,
});

export default rootReducer;
