import { combineReducers } from 'redux';

import { user } from './User/user.reducer';
import { events } from './Events/events.reducer'

const reducer = combineReducers({
  user,
  events
});

export default reducer;