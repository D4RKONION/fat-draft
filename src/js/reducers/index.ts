import { combineReducers } from 'redux';

import { userReducer } from './user';
import { opponentReducer } from './opponent';
import { draftReducer } from './draft';


const rootReducer = combineReducers({
  userState: userReducer,
  opponentState: opponentReducer,
  draftState: draftReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;