import { SET_DRAFT_CHARACTERS } from "../actions";

type draftCharactersReducerState = string[];

type draftCharactersReducerAction = {
  type: typeof SET_DRAFT_CHARACTERS;
  characterList: string[];
}

const defaultState: draftCharactersReducerState = [];

export const draftCharactersReducer = (state = defaultState, action: draftCharactersReducerAction) => {
  switch(action.type) {
    case SET_DRAFT_CHARACTERS:
      return action.characterList;
    default:
      return state;
  }
}