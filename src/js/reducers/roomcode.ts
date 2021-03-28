import { SET_ROOM_CODE } from "../actions";

type roomCodeReducerState = string;

type roomCodeReducerAction = {
  type: typeof SET_ROOM_CODE;
  roomCode: string;
}

const defaultState: roomCodeReducerState = "";

export const roomCodeReducer = (state = defaultState, action: roomCodeReducerAction) => {
  switch(action.type) {
    case SET_ROOM_CODE:
      return action.roomCode;
    default:
      return state;
  }
}