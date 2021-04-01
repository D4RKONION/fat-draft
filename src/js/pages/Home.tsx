import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import NameInput from "../components/NameInput";
import PageHeader from "../components/PageHeader";
import { roomCodeSelector, userNameSelector } from "../selectors";
import { WebSocketContext } from "../socket";
import './Home.scss'

const Home = () => {

  const ws = useContext<any>(WebSocketContext);

  const userName = useSelector(userNameSelector);
  const roomCode = useSelector(roomCodeSelector);
  
  let history = useHistory();

  useEffect(() => {
    ws.socket.connected && userName !== "" && roomCode !== "" &&
      history.push(`/Draft/${roomCode}`)
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName, roomCode]);

  return (
    <div className="home">
      <PageHeader></PageHeader>
      {!userName
        ? <NameInput></NameInput>
        : <button onClick={e => {
          e.preventDefault();
          ws.socket.io.opts.extraHeaders.username = userName.substring(0, userName.indexOf("#"));
          ws.socket.io.opts.extraHeaders.roomcode = roomCode;
          ws.socket.connect()
        }}>Draft!</button>
      }
      
    </div>

  );
}

export default Home;