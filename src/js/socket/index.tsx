// adapted from
// https://www.pluralsight.com/guides/using-web-sockets-in-your-reactredux-app
import { createContext } from 'react'
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { setRoomCode, setUserName } from '../actions';


const WebSocketContext = createContext(null)

export { WebSocketContext };

const WebSocketProvider = ({ children }: {children: any}) => {
  
  const ENDPOINT = "http://127.0.0.1:4001";
  let socket: any;
  let ws: any;
  const dispatch = useDispatch();

  const sendMessage = (roomId: string, message: string) => {
    const payload = {
      roomId: roomId,
      data: message
    }
    socket.emit("event://send-message", JSON.stringify(payload));
    // dispatch(updateChatLog(payload));
  }

  if (!socket) {
    
    socket = io(ENDPOINT, { autoConnect: false, extraHeaders: { username: "", roomcode: "" } });

    socket.onAny((event:any, ...args:any) => {
      console.log(event, args);
    });

    socket.on("event://room-joined", (payload: {userName: string, roomCode: string}) => {
      console.log("Handling joined room");
      dispatch(setUserName(payload.userName))
      dispatch(setRoomCode(payload.roomCode));
    })

    ws = {
      socket: socket,
      sendMessage
    }
  }

  return (
    <WebSocketContext.Provider value={ws}>
      {children}
    </WebSocketContext.Provider>
  )
}

export default WebSocketProvider;