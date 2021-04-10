import { Draft, Opponent, User } from "../types";

//action types
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_LEVEL = "SET_USER_LEVEL";
export const SET_ACTIVE_GAME = "SET_ACTIVE_GAME";
export const SET_ROOM_CODE = "SET_ROOM_CODE";
export const SET_OPPONENT_NAME = "SET_OPPONENT_NAME";
export const SET_OPPONENT_IS_CONNECTED = "SET_OPPONENT_IS_CONNECTED";
export const SET_OPPONENT_STATE = "SET_OPPONENT_STATE";
export const SET_DRAFT_CHARACTERS = "SET_DRAFT_CHARACTERS";
export const SET_USER_STATE = "SET_USER_STATE";
export const SET_BANNED_CHARACTER = "SET_BANNED_CHARACTER";
export const RESET_BANNED_CHARACTERS = "RESET_BANNED_CHARACTERS";
export const SET_PICKED_CHARACTER = "SET_PICKED_CHARACTER";
export const RESET_PICKED_CHARACTERS = "RESET_PICKED_CHARACTERS";

//action creators
export const setUserName = (userData: User["name"]) => ({
  type: SET_USER_NAME,
  "userData": {name: userData},
})

export const setUserLevel = (userData: User["level"]) => ({
  type: SET_USER_LEVEL,
  "userData": {level: userData},
})

export const setUserState = (userData: User["state"]) => ({
  type: SET_USER_STATE,
  "userData": {state: userData},
})

export const setRoomCode = (draftData: Draft["roomCode"]) => ({
  type: SET_ROOM_CODE,
  "draftData": {roomCode: draftData},
})
export const setActiveGame = (draftData: Draft["activeGame"]) => ({
  type: SET_ACTIVE_GAME,
  "draftData": {activeGame: draftData},
})

export const setOpponentName = (opponentData: Opponent["name"]) => ({
  type: SET_OPPONENT_NAME,
  "opponentData": {name: opponentData},
})

export const setOpponentIsConnected = (opponentData: Opponent["isConnected"]) => ({
  type: SET_OPPONENT_IS_CONNECTED,
  "opponentData": {isConnected: opponentData},
})

export const setOpponentState = (opponentData: Opponent["state"]) => ({
  type: SET_OPPONENT_STATE,
  "opponentData": {state: opponentData},
})

export const setDraftCharacters = (draftData: Draft["draftCharacters"]) => ({
  type: SET_DRAFT_CHARACTERS,
  "draftData": {draftCharacters: draftData},
})

export const setBannedCharacter = (bannedCharacter: {player: string, character: string}) => ({
  type: SET_BANNED_CHARACTER,
  "draftData": {bannedCharacter},
})
export const resetBannedCharacters = (confirm: Boolean) => ({
  type: RESET_BANNED_CHARACTERS,
  confirm,
})

export const setPickedCharacter = (pickedCharacter: {player: string, character: string}) => ({
  type: SET_PICKED_CHARACTER,
  "draftData": {pickedCharacter},
})
export const resetPickedCharacters = (confirm: Boolean) => ({
  type: RESET_PICKED_CHARACTERS,
  confirm,
})



export const actionCreators = {
  setUserName,
  setUserLevel,
  setRoomCode,
  setOpponentName,
  setUserState,
  setDraftCharacters,
  setBannedCharacter,
  resetBannedCharacters,
  setPickedCharacter,
  resetPickedCharacters
}