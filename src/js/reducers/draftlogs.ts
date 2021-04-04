import { SET_BANNED_CHARACTER, SET_PICKED_CHARACTER, RESET_PICKED_CHARACTERS } from "../actions";

type DraftLogsReducerState = string[];

type DraftLogsReducerAction = {
  type: typeof SET_BANNED_CHARACTER | typeof SET_PICKED_CHARACTER | typeof RESET_PICKED_CHARACTERS;
  payload: {player: "user" | "opponent", character: string}
};

const defaultState: DraftLogsReducerState = [];

export const draftLogReducer = (state = defaultState, action: DraftLogsReducerAction) => {
  switch(action.type) {
    case SET_BANNED_CHARACTER:
      const banLog = `${action.payload.player === "user" ? "[usr]" : "[opp]"} banned ${action.payload.character}`
      return [...state, banLog]
    case SET_PICKED_CHARACTER:
      const pickLog = `${action.payload.player === "user" ? "[usr]" : "[opp]"} picked ${action.payload.character}`
      return [...state, pickLog]
    case RESET_PICKED_CHARACTERS:
      return defaultState;
    default:
      return state;
  }
}