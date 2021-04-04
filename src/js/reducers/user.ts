import { SET_USER_LEVEL, SET_USER_NAME, SET_USER_STATE } from "../actions";
import { User } from "../types";

type userReducerState = User;

type userReducerAction = {
  type: typeof SET_USER_NAME | typeof SET_USER_LEVEL | typeof SET_USER_STATE;
  userData: User;
}

const defaultState: userReducerState = {
  name: "",
  level: "unset",
  state: "start",
};

export const userReducer = (state = defaultState, action: userReducerAction) => {
  switch(action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        name: action.userData.name,
      };
    case SET_USER_LEVEL:
      return {
        ...state,
        level: action.userData.level,
      };
    case SET_USER_STATE:
      return {
        ...state,
        state: action.userData.state,
      };
    default:
      return state;
  }
}