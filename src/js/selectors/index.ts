import type { RootState } from '../reducers';

export const userNameSelector =  (state: RootState) => state.userState.name;
export const userLevelSelector = (state: RootState) => state.userState.level;
export const userStateSelector = (state: RootState) => state.userState.state;

export const opponentNameSelector =  (state: RootState) => state.opponentState.name;
export const opponentIsConnectedSelector =  (state: RootState) => state.opponentState.isConnected;
export const opponentStateSelector =  (state: RootState) => state.opponentState.state;

export const roomCodeSelector =  (state: RootState) => state.draftState.roomCode;
export const draftCharactersSelector =  (state: RootState) => state.draftState.draftCharacters;
export const bannedCharactersSelector = (state: RootState) => state.draftState.bannedCharacters;
export const pickedCharactersSelector = (state: RootState) => state.draftState.pickedCharacters;
export const draftLogSelector = (state: RootState) => state.draftState.draftLog;
export const activeGameSelector = (state: RootState) => state.draftState.activeGame;

