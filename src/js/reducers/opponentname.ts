import { SET_OPPONENT_NAME } from "../actions";

type opponentNameReducerState = string;

type opponentNameReducerAction = {
  type: typeof SET_OPPONENT_NAME;
  opponentName: string;
}

const defaultState: opponentNameReducerState = "";

export const opponentNameReducer = (state = defaultState, action: opponentNameReducerAction) => {
  switch(action.type) {
    case SET_OPPONENT_NAME:
      return action.opponentName;
    default:
      return state;
  }
}