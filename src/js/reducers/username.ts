import { SET_USER_NAME } from "../actions";

type userNameReducerState = string;

type userNameReducerAction = {
  type: typeof SET_USER_NAME;
  userName: string;
}

const defaultState: userNameReducerState = "";

export const userNameReducer = (state = defaultState, action: userNameReducerAction) => {
  switch(action.type) {
    case SET_USER_NAME:
      return action.userName;
    default:
      return state;
  }
}