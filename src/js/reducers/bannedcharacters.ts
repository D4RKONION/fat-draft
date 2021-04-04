import { SET_BANNED_CHARACTER, RESET_BANNED_CHARACTERS } from "../actions";

type bannedCharactersReducerState = {[key: string]: any}

type bannedCharactersReducerAction = {
  type: typeof SET_BANNED_CHARACTER | typeof RESET_BANNED_CHARACTERS;
  payload: {player: "user" | "opponent", character: string}
}

const defaultState: bannedCharactersReducerState = {user: [], opponent: []};

export const bannedCharactersReducer = (state = defaultState, action: bannedCharactersReducerAction) => {
  switch(action.type) {
    case SET_BANNED_CHARACTER:
      return {
        ...state,
        [action.payload.player]: [...state[action.payload.player], action.payload.character],
      };
    case RESET_BANNED_CHARACTERS:
      return defaultState;
    default:
      return state;
  }
}