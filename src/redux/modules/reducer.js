import { combineReducers } from 'redux';

import auth from './auth';
import request from './request';
import response from './response';
import tracks from './tracks';

const reducer = combineReducers({
  auth,
  request,
  response,
  tracks,
});

export default reducer;
