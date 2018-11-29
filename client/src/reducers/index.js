import { combineReducers } from 'redux';
import user from './user';
import documents from './documents';
import billing from './billing';

const rootReducer = combineReducers({
  user,
  documents,
  billing,
});

export default rootReducer;
