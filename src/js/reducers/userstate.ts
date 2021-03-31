import { SET_USER_STATE } from "../actions";

type userStateReducerState = "inactive" | "ban" | "pick";

type userStateReducerAction = {
  type: typeof SET_USER_STATE;
  userState: string;
}

const defaultState: userStateReducerState = "inactive";

export const userStateReducer = (state = defaultState, action: userStateReducerAction) => {
  switch(action.type) {
    case SET_USER_STATE:
      return action.userState;
    default:
      return state;
  }
}