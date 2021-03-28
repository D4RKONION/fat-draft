import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { roomCodeSelector, userNameSelector } from "../selectors";
import { WebSocketContext } from "../socket";

const Home = () => {

  const ws = useContext<any>(WebSocketContext);

  const [userNameText, setUserNameText] = useState("");
  const userName = useSelector(userNameSelector);
  const roomCode = useSelector(roomCodeSelector);
  
  let history = useHistory();

  useEffect(() => {
    console.log(userName)
    userName !== "" && roomCode !== "" &&
      history.push(`/draft/${roomCode}`)
  }, [userName, roomCode]);

  return (
    <>
      <form>
        <label>Name</label>
        <input value={userNameText} onChange={e => setUserNameText(e.target.value)}></input>
        <button onClick={e => {
          e.preventDefault();
          ws.socket.io.opts.extraHeaders.username = userNameText;
          ws.socket.io.opts.extraHeaders.roomcode = roomCode;
          ws.socket.connect()
        }}>Send</button>
      </form>
    </>

  );
}

export default Home;