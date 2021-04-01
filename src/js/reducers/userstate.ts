import { SET_USER_STATE } from "../actions";

type userStateReducerState = "start" | "inactive" | "ban" | "pick" | "finished";

type userStateReducerAction = {
  type: typeof SET_USER_STATE;
  userState: string;
}

const defaultState: userStateReducerState = "start";

export const userStateReducer = (state = defaultState, action: userStateReducerAction) => {
  switch(action.type) {
    case SET_USER_STATE:
      return action.userState;
    default:
      return state;
  }
}