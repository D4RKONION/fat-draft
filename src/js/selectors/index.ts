import type { RootState } from '../reducers';

export const userNameSelector =  (state: RootState) => state.userNameState;
export const roomCodeSelector =  (state: RootState) => state.roomCodeState;
export const userLevelSelector = (state: RootState) => state.userLevelState;
export const opponentNameSelector =  (state: RootState) => state.opponentNameState;
export const userStateSelector =  (state: RootState) => state.userStateState;
export const draftCharactersSelector =  (state: RootState) => state.draftCharactersState;
export const bannedCharactersSelector = (state: RootState) => state.bannedCharactersState;
export const pickedCharactersSelector = (state: RootState) => state.pickedCharactersState;

