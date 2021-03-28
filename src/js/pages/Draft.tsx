import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setRoomCode } from "../actions";
import { roomCodeSelector } from "../selectors";
import { WebSocketContext } from "../socket";

const Draft = () => {
  
  const roomCode = useSelector(roomCodeSelector)
  const dispatch = useDispatch();

  let history = useHistory();

  const slugs:{roomCodeSlug: string} = useParams();

  

  useEffect(() => {
    if (roomCode === "") {
      dispatch(setRoomCode(slugs.roomCodeSlug));
      history.push("/")
    }
  }, []);

  return (
    <h1>Draft</h1>
  )
}

export default Draft;