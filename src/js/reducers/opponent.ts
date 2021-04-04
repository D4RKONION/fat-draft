import { SET_OPPONENT_NAME, SET_OPPONENT_IS_CONNECTED, SET_OPPONENT_STATE } from "../actions";
import { Opponent } from "../types";

type opponentReducerState = Opponent;

type opponentReducerAction = {
  type: typeof SET_OPPONENT_NAME | typeof SET_OPPONENT_IS_CONNECTED | typeof SET_OPPONENT_STATE;
  opponentData: Opponent;
}

const defaultState: opponentReducerState = {
  name: "",
  isConnected: false,
  state: "unset",
};

export const opponentReducer = (state = defaultState, action: opponentReducerAction) => {
  switch(action.type) {
    case SET_OPPONENT_NAME:
      return {
        ...state,
        name: action.opponentData.name,
      };
    case SET_OPPONENT_IS_CONNECTED:
      return {
        ...state,
        isConnected: action.opponentData.isConnected,
      };
    case SET_OPPONENT_STATE:
      return {
        ...state,
        state: action.opponentData.state,
      };
    default:
      return state;
  }
}