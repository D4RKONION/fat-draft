import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { roomCodeSelector } from "../selectors";
import { WebSocketContext } from "../socket";
import "./NameInput.scss"

const NameInput = () => {
  const ws = useContext<any>(WebSocketContext);
  
  const [userNameText, setUserNameText] = useState("");
  const roomCode = useSelector(roomCodeSelector);

  return (
    <form className="nameInput">
      <input placeholder="Enter a username!" value={userNameText} onChange={e => setUserNameText(e.target.value)}></input>
      <button onClick={e => {
        e.preventDefault();
        if (!userNameText) {return false};
        ws.socket.io.opts.extraHeaders.username = userNameText;
        ws.socket.io.opts.extraHeaders.roomcode = roomCode;
        ws.socket.connect()
      }}>Let's Draft!</button>
    </form>
  )

}

export default NameInput;