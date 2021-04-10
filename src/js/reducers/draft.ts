import { RESET_BANNED_CHARACTERS, RESET_PICKED_CHARACTERS, SET_ACTIVE_GAME, SET_BANNED_CHARACTER, SET_DRAFT_CHARACTERS, SET_PICKED_CHARACTER, SET_ROOM_CODE } from "../actions";
import { Draft } from "../types";

type DraftReducerState = Draft;

interface DraftData extends Draft {
  bannedCharacter: {player: "user" | "opponent", character: string}
  pickedCharacter: {player: "user" | "opponent", character: string}
}

type DraftReducerAction = {
  type: typeof SET_ACTIVE_GAME | typeof SET_ROOM_CODE | typeof SET_DRAFT_CHARACTERS | typeof SET_BANNED_CHARACTER  | typeof SET_PICKED_CHARACTER | typeof RESET_BANNED_CHARACTERS | typeof RESET_PICKED_CHARACTERS; 
  draftData: DraftData;
}

const defaultState: DraftReducerState = {
  roomCode: "",
  activeGame: "SFV",
  draftCharacters: [],
  bannedCharacters: {user: [], opponent: []},
  pickedCharacters: {user: [], opponent: []},
  draftLog: [],
};

export const draftReducer = (state = defaultState, action: DraftReducerAction) => {
  switch(action.type) {
    case SET_ACTIVE_GAME:
      return {
        ...state,
        activeGame: action.draftData.activeGame,
      };
    case SET_ROOM_CODE:
      return {
        ...state,
        roomCode: action.draftData.roomCode,
      };
    case SET_DRAFT_CHARACTERS:
      return {
        ...state,
        draftCharacters: action.draftData.draftCharacters,
      };
    case SET_BANNED_CHARACTER:
      const banLog = `${action.draftData.bannedCharacter.player === "user" ? "[usr]" : "[opp]"} banned ${action.draftData.bannedCharacter.character}`
      return {
        ...state,
        bannedCharacters: {
          ...state.bannedCharacters,
          [action.draftData.bannedCharacter.player]: [...state.bannedCharacters[action.draftData.bannedCharacter.player], action.draftData.bannedCharacter.character],
        },
        draftLog: [...state.draftLog, banLog]
      };
    case SET_PICKED_CHARACTER:
      const pickLog = `${action.draftData.pickedCharacter.player === "user" ? "[usr]" : "[opp]"} picked ${action.draftData.pickedCharacter.character}`
      return {
        ...state,
        pickedCharacters: {
          ...state.pickedCharacters,
          [action.draftData.pickedCharacter.player]: [...state.pickedCharacters[action.draftData.pickedCharacter.player], action.draftData.pickedCharacter.character],
        },
        draftLog: [...state.draftLog, pickLog]
      };
    case RESET_BANNED_CHARACTERS:
      return {
        ...state,
        bannedCharacters: defaultState.bannedCharacters,
      };
    case RESET_PICKED_CHARACTERS:
      return {
        ...state,
        pickedCharacters: defaultState.pickedCharacters,
        draftLog: defaultState.draftLog,
      };
    default:
      return state;
  }
}