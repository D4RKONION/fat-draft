import type { RootState } from '../reducers';

export const userNameSelector =  (state: RootState) => state.userNameState;
export const roomCodeSelector =  (state: RootState) => state.roomCodeState;
export const opponentNameSelector =  (state: RootState) => state.opponentNameState;
export const userStateSelector =  (state: RootState) => state.userStateState;
export const draftCharactersSelector =  (state: RootState) => state.draftCharactersState;
export const bannedCharactersSelector = (state: RootState) => state.bannedCharactersState;

