import { combineReducers } from 'redux';
import valuesReducer from './modules/points';
import tableReducer from './modules/table';
import authReducer from './modules/auth';

const reducer = combineReducers({
  points: valuesReducer,
  table: tableReducer,
  auth: authReducer
});

export default reducer;