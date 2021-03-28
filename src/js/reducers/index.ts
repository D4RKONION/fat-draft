import { combineReducers } from 'redux';

import { userNameReducer } from './username';
import { roomCodeReducer } from './roomcode';


const rootReducer = combineReducers({
  userNameState: userNameReducer,
  roomCodeState: roomCodeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;