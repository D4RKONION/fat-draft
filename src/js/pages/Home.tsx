import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import { io } from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:4001";

const Home = () => {
  const [userName, setUserName] = useState("");
  const socketRef = useRef<any>(null);
  let history = useHistory();

  useEffect(() => {

    socketRef.current = io(ENDPOINT, { autoConnect: false, extraHeaders: { username: userName } });

    socketRef.current.on("room joined", (roomCode:string) => {
      history.push(`draft/${roomCode}`);
    })
    
    socketRef.current.onAny((event:any, ...args:any) => {
      console.log(event, args);
    });
    
    return () => { socketRef.current?.disconnect() };
  }, []);

  return (
    <>
      <form>
        <label>Name</label>
        <input value={userName} onChange={e => setUserName(e.target.value)}></input>
        <button onClick={e => {
          e.preventDefault();
          socketRef.current.io.opts.extraHeaders.username = userName;
          socketRef.current?.connect()
        }}>Send</button>
      </form>
    </>

  );
}

export default Home;