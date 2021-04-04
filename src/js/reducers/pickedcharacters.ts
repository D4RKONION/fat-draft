import { SET_PICKED_CHARACTER, RESET_PICKED_CHARACTERS } from "../actions";

type pickedCharactersReducerState = {[key: string]: any}

type pickedCharactersReducerAction = {
  type: typeof SET_PICKED_CHARACTER | typeof RESET_PICKED_CHARACTERS;
  payload: {player: "user" | "opponent", character: string}
}

const defaultState: pickedCharactersReducerState = {user: [], opponent: []};

export const pickedCharactersReducer = (state = defaultState, action: pickedCharactersReducerAction) => {
  switch(action.type) {
    case SET_PICKED_CHARACTER:
      return {
        ...state,
        [action.payload.player]: [...state[action.payload.player], action.payload.character],
      };
    case RESET_PICKED_CHARACTERS:
      return defaultState;
    default:
      return state;
  }
}