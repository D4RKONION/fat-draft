//action types
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_LEVEL = "SET_USER_LEVEL";
export const SET_ROOM_CODE = "SET_ROOM_CODE";
export const SET_OPPONENT_NAME = "SET_OPPONENT_NAME";
export const SET_DRAFT_CHARACTERS = "SET_DRAFT_CHARACTERS";
export const SET_USER_STATE = "SET_USER_STATE";
export const SET_BANNED_CHARACTERS = "SET_BANNED_CHARACTERS";
export const RESET_BANNED_CHARACTERS = "RESET_BANNED_CHARACTERS";
export const SET_PICKED_CHARACTER = "SET_PICKED_CHARACTER";
export const RESET_PICKED_CHARACTERS = "RESET_PICKED_CHARACTERS";

//action creators
export const setUserName = (userName: string) => ({
  type: SET_USER_NAME,
  userName,
})

export const setUserLevel = (userLevel: string) => ({
  type: SET_USER_LEVEL,
  userLevel,
})

export const setRoomCode = (roomCode: string) => ({
  type: SET_ROOM_CODE,
  roomCode,
})

export const setOpponentName = (opponentName: string) => ({
  type: SET_OPPONENT_NAME,
  opponentName,
})

export const setUserState = (userState: string) => ({
  type: SET_USER_STATE,
  userState,
})

export const setDraftCharacters = (characterList: string[]) => ({
  type: SET_DRAFT_CHARACTERS,
  characterList,
})

export const setBannedCharacters = (banData: {bannedBy: string, bannedCharacter: string}) => ({
  type: SET_BANNED_CHARACTERS,
  banData,
})
export const resetBannedCharacters = (confirm: Boolean) => ({
  type: RESET_BANNED_CHARACTERS,
  confirm,
})

export const setPickedCharacter = (pickData: {pickedBy: string, pickedCharacter: string}) => ({
  type: SET_PICKED_CHARACTER,
  pickData,
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
  setBannedCharacters,
  resetBannedCharacters,
  setPickedCharacter,
  resetPickedCharacters
}