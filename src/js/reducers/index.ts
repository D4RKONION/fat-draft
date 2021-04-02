import { combineReducers } from 'redux';

import { userNameReducer } from './username';
import { roomCodeReducer } from './roomcode';
import { userLevelReducer } from './userlevel';
import { opponentNameReducer } from './opponentname';
import { draftCharactersReducer } from './draftcharacters';
import { userStateReducer } from './userstate';
import { bannedCharactersReducer } from './bannedcharacters';
import { pickedCharactersReducer } from './pickedcharacters';


const rootReducer = combineReducers({
  userNameState: userNameReducer,
  roomCodeState: roomCodeReducer,
  userLevelState: userLevelReducer,
  opponentNameState: opponentNameReducer,
  userStateState: userStateReducer,
  draftCharactersState: draftCharactersReducer,
  bannedCharactersState: bannedCharactersReducer,
  pickedCharactersState: pickedCharactersReducer,  
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;