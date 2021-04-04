import { combineReducers } from 'redux';

import { userReducer } from './user';
import { roomCodeReducer } from './roomcode';
import { opponentReducer } from './opponent';
import { draftCharactersReducer } from './draftcharacters';
import { bannedCharactersReducer } from './bannedcharacters';
import { pickedCharactersReducer } from './pickedcharacters';


const rootReducer = combineReducers({
  userState: userReducer,
  roomCodeState: roomCodeReducer,
  opponentState: opponentReducer,
  draftCharactersState: draftCharactersReducer,
  bannedCharactersState: bannedCharactersReducer,
  pickedCharactersState: pickedCharactersReducer,  
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;