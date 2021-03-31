import { combineReducers } from 'redux';

import { userNameReducer } from './username';
import { roomCodeReducer } from './roomcode';
import { opponentNameReducer } from './opponentname';
import { draftCharactersReducer } from './draftcharacters';
import { userStateReducer } from './userstate';
import { bannedCharactersReducer } from './bannedcharacters';


const rootReducer = combineReducers({
  userNameState: userNameReducer,
  roomCodeState: roomCodeReducer,
  opponentNameState: opponentNameReducer,
  userStateState: userStateReducer,
  draftCharactersState: draftCharactersReducer,
  bannedCharactersState: bannedCharactersReducer,  
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;