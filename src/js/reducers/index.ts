import { combineReducers } from 'redux';

import { userReducer } from './user';
import { roomCodeReducer } from './roomcode';
import { opponentReducer } from './opponent';
import { draftCharactersReducer } from './draftcharacters';
import { bannedCharactersReducer } from './bannedcharacters';
import { pickedCharactersReducer } from './pickedcharacters';
import { draftLogReducer } from './draftlogs';


const rootReducer = combineReducers({
  userState: userReducer,
  roomCodeState: roomCodeReducer,
  opponentState: opponentReducer,
  draftCharactersState: draftCharactersReducer,
  draftLogState: draftLogReducer,
  bannedCharactersState: bannedCharactersReducer,
  pickedCharactersState: pickedCharactersReducer,  
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;