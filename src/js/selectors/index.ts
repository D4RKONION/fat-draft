import type { RootState } from '../reducers';

export const userNameSelector =  (state: RootState) => state.userNameState;
export const roomCodeSelector =  (state: RootState) => state.roomCodeState;
