import { combineReducers } from 'redux';
import user from './user';
import documents from './documents';

const rootReducer = combineReducers({
  user,
  documents,
});

export default rootReducer;
