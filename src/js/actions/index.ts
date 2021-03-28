//action types
export const SET_USER_NAME = "SET_USER_NAME";
export const SET_ROOM_CODE = "SET_ROOM_CODE";

//action creators
export const setUserName = (userName: string) => ({
  type: SET_USER_NAME,
  userName,
})

export const setRoomCode = (roomCode: string) => ({
  type: SET_ROOM_CODE,
  roomCode,
})

export const actionCreators = {
  setUserName,
  setRoomCode,
}