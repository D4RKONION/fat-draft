import { SET_BANNED_CHARACTERS } from "../actions";

type bannedCharactersReducerState = {[key: string]: any}

type bannedCharactersReducerAction = {
  type: typeof SET_BANNED_CHARACTERS;
  banData: {bannedBy: "user" | "opponent", bannedCharacter: string}
}

const defaultState: bannedCharactersReducerState = {user: [], opponent: []};

export const bannedCharactersReducer = (state = defaultState, action: bannedCharactersReducerAction) => {
  switch(action.type) {
    case SET_BANNED_CHARACTERS:
      return {
        ...state,
        [action.banData.bannedBy]: [...state[action.banData.bannedBy], action.banData.bannedCharacter],
      };
    default:
      return state;
  }
}