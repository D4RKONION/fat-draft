// adapted from
// https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app
import { createContext } from 'react'
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setOpponentName, setRoomCode, setUserName, setDraftCharacters, setUserState, setBannedCharacter, setPickedCharacter, setUserLevel, setOpponentIsConnected, setOpponentState, setActiveGame } from '../actions';
import { useHistory } from 'react-router';
import { Draft, User } from '../types';


const WebSocketContext = createContext(null);

export { WebSocketContext };

const WebSocketProvider = ({ children }: {children: any}) => {
  
  const ENDPOINT = "http://127.0.0.1:4001";
  const PATH = "";
  // const ENDPOINT = "https://fullmeter.com";
  // const PATH = "/fatdraftserver"
  let socket: any;
  let ws: any;
  const dispatch = useDispatch()

  const banCharacter = (characterName: string) => {
    socket.emit("user://select-character", {selectionType: "banned", characterName});
    dispatch(setBannedCharacter({player: "user", character: characterName}));
    dispatch(setUserState("inactive"));
  }

  const pickCharacter = (characterName: string) => {
    socket.emit("user://select-character", {selectionType: "picked", characterName});
    dispatch(setPickedCharacter({player: "user", character: characterName}));
    dispatch(setUserState("inactive"));
  }

  const voteRedraft = () => {
    dispatch(setUserState("requesting-redraft"));
    socket.emit("user://vote-redraft");
  }

  const startNewDraft = (settings: {activeGame: string, numberOfCharacters: string, numberOfPicks: string}) => {
    socket.emit("user://start-new-draft", settings);
  }

  if (!socket) {
    
    socket = io(ENDPOINT, { path: PATH, autoConnect: false, extraHeaders: { username: "", roomcode: "", activegame: "", numberofcharacters: "", numberofpicks: "", }});

    socket.onAny((event:any, ...args:any) => {
      console.log(event, args);
    });

    // tell a user whether they are host or guest. Guests cannot set settings
    socket.on("data://user-level", (userLevel: User["level"]) => {
      dispatch(setUserLevel(userLevel));
    })

    // room created, waiting on opponent
    socket.on("event://room-created", (payload: {userName: string, roomCode: string}) => {
      dispatch(setUserName(payload.userName));
      dispatch(setRoomCode(payload.roomCode));
      dispatch(setUserState("inactive"));
    })

    // opponent joined your room
    socket.on("event://opponent-joined", (payload: {opponentName: string}) => {
      dispatch(setOpponentName(payload.opponentName));
      dispatch(setOpponentIsConnected(true));
    })

    // you joined an opponent's room
    socket.on("event://room-joined", (payload: {userName: string, roomCode: string, opponentName?: string}) => {
      dispatch(setUserName(payload.userName));
      dispatch(setRoomCode(payload.roomCode));
      dispatch(setUserState("inactive"));
      console.log(payload.opponentName)
      if (payload.opponentName) {
        dispatch(setOpponentName(payload.opponentName));
        dispatch(setOpponentIsConnected(true));
      }
    })

    // list of draftable characters received
    socket.on("data://draft-data", (draftData: {
      draftCharacters: Draft["draftCharacters"],
      activeGame: Draft["activeGame"],
      numberOfCharacters: string,
      numberOfPicks: string,
    }) => {
      dispatch(setUserState("inactive"));
      dispatch(setDraftCharacters(draftData.draftCharacters));
      dispatch(setActiveGame(draftData.activeGame));
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
    socket.on("data://banned-character", (character: string) => {
      dispatch(setBannedCharacter({player: "opponent", character }));
    })

    // a character has been picked by the other user
    socket.on("data://picked-character", (character: string) => {
      dispatch(setPickedCharacter({player: "opponent", character }));
    })

    // the draft has ended
    socket.on("event://draft-finished", () => {
      dispatch(setUserState("finished"));
    })

    // the opponent has voted to redraft
    socket.on("event://opponent-vote-redraft", () => {
      dispatch(setOpponentState("requesting-redraft"));
    })

    // the opponent has disconnected
    socket.on("event://opponent-disconnected", () => {
      dispatch(setOpponentIsConnected(false));
    })

    ws = {
      socket: socket,
      banCharacter,
      pickCharacter,
      voteRedraft,
      startNewDraft
    }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketProvider;