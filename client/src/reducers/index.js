import { combineReducers } from 'redux';
import user from './user';
import envelopes from './envelopes';

const rootReducer = combineReducers({
  user,
  envelopes,
});

export default rootReducer;
