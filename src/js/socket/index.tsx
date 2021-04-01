// adapted from
// https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app
import { createContext } from 'react'
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setOpponentName, setRoomCode, setUserName, setDraftCharacters, setUserState, setBannedCharacters, setPickedCharacter } from '../actions';


const WebSocketContext = createContext(null);

export { WebSocketContext };

const WebSocketProvider = ({ children }: {children: any}) => {
  
  const ENDPOINT = "http://127.0.0.1:4001";
  let socket: any;
  let ws: any;
  const dispatch = useDispatch()

  const banCharacter = (characterName: string) => {
    socket.emit("user://select-character", {selectionType: "banned", characterName});
    dispatch(setBannedCharacters({bannedBy: "user", bannedCharacter: characterName}));
    dispatch(setUserState("inactive"));
  }

  const pickCharacter = (characterName: string) => {
    socket.emit("user://select-character", {selectionType: "picked", characterName});
    dispatch(setPickedCharacter({pickedBy: "user", pickedCharacter: characterName}));
    dispatch(setUserState("inactive"));
  }

  if (!socket) {
    
    socket = io(ENDPOINT, { autoConnect: false, extraHeaders: { username: "", roomcode: "" } });

    socket.onAny((event:any, ...args:any) => {
      console.log(event, args);
    });

    // room created, waiting on opponent
    socket.on("event://room-created", (payload: {userName: string, roomCode: string}) => {
      dispatch(setUserName(payload.userName));
      dispatch(setRoomCode(payload.roomCode));
      dispatch(setUserState("inactive"));
    })

    // opponent joined your room
    socket.on("event://opponent-joined", (payload: {opponentName: string}) => {
      dispatch(setOpponentName(payload.opponentName));
    })

    // you joined an opponent's room
    socket.on("event://room-joined", (payload: {userName: string, roomCode: string, opponentName?: string}) => {
      dispatch(setUserName(payload.userName));
      dispatch(setRoomCode(payload.roomCode));
      dispatch(setUserState("inactive"));
      console.log(payload.opponentName)
      payload.opponentName && dispatch(setOpponentName(payload.opponentName));
    })

    // list of draftable characters received
    socket.on("data://draft-characters", (characterList: string[]) => {
      dispatch(setDraftCharacters(characterList));
    })

    // you may ban a character
    socket.on("request://ban-character", () => {
      dispatch(setUserState("ban"));
    })

    // you may ban a character
    socket.on("request://pick-character", () => {
      dispatch(setUserState("pick"));
    })

    // a character has been banned by the other user
    socket.on("data://banned-character", (bannedCharacter: string) => {
      dispatch(setBannedCharacters({bannedBy: "opponent", bannedCharacter }))
    })

    // a character has been picked by the other user
    socket.on("data://picked-character", (pickedCharacter: string) => {
      dispatch(setPickedCharacter({pickedBy: "opponent", pickedCharacter }))
    })

    // you joined an opponent's room
    socket.on("event://draft-finished", () => {
      dispatch(setUserState("finished"));
      socket.disconnect();
    })
    


    ws = {
      socket: socket,
      banCharacter,
      pickCharacter
    }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketProvider;