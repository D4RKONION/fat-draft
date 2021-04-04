import type { RootState } from '../reducers';

export const userNameSelector =  (state: RootState) => state.userState.name;
export const userLevelSelector = (state: RootState) => state.userState.level;
export const userStateSelector = (state: RootState) => state.userState.state;
export const roomCodeSelector =  (state: RootState) => state.roomCodeState;
export const opponentNameSelector =  (state: RootState) => state.opponentState.name;
export const opponentIsConnectedSelector =  (state: RootState) => state.opponentState.isConnected;
export const opponentStateSelector =  (state: RootState) => state.opponentState.state;
export const draftCharactersSelector =  (state: RootState) => state.draftCharactersState;
export const bannedCharactersSelector = (state: RootState) => state.bannedCharactersState;
export const pickedCharactersSelector = (state: RootState) => state.pickedCharactersState;

