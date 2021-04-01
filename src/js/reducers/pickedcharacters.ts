import { SET_PICKED_CHARACTER, RESET_PICKED_CHARACTERS } from "../actions";

type pickedCharactersReducerState = {[key: string]: any}

type pickedCharactersReducerAction = {
  type: typeof SET_PICKED_CHARACTER | typeof RESET_PICKED_CHARACTERS;
  pickData: {pickedBy: "user" | "opponent", pickedCharacter: string}
}

const defaultState: pickedCharactersReducerState = {user: [], opponent: []};

export const pickedCharactersReducer = (state = defaultState, action: pickedCharactersReducerAction) => {
  switch(action.type) {
    case SET_PICKED_CHARACTER:
      return {
        ...state,
        [action.pickData.pickedBy]: [...state[action.pickData.pickedBy], action.pickData.pickedCharacter],
      };
    case RESET_PICKED_CHARACTERS:
      return defaultState;
    default:
      return state;
  }
}