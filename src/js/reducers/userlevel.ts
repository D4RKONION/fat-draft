import { SET_USER_LEVEL } from "../actions";

type userLevelReducerState = string;

type userLevelReducerAction = {
  type: typeof SET_USER_LEVEL;
  userLevel: string;
}

const defaultState: userLevelReducerState = "";

export const userLevelReducer = (state = defaultState, action: userLevelReducerAction) => {
  switch(action.type) {
    case SET_USER_LEVEL:
      return action.userLevel;
    default:
      return state;
  }
}