import { combineReducers } from 'redux';

import userReducer from './user';
import battleReducer from './battle';
const rootReducers = combineReducers({
  user: userReducer,
  battle: battleReducer
});


export default rootReducers;