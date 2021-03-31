import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setRoomCode } from "../actions";
import styles from './Draft.module.scss'; 
import { opponentNameSelector, roomCodeSelector, userNameSelector, userStateSelector } from "../selectors";
import DraftList from "../components/DraftList";

const Draft = () => {
   
  const userName = useSelector(userNameSelector);
  const roomCode = useSelector(roomCodeSelector);
  const opponentName = useSelector(opponentNameSelector);
  const userState = useSelector(userStateSelector);

  const dispatch = useDispatch();

  let history = useHistory();

  const slugs:{roomCodeSlug: string} = useParams();

  

  useEffect(() => {
    if (roomCode === "") {
      dispatch(setRoomCode(slugs.roomCodeSlug));
      history.push("/")
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.draft}>
      <h1>Draft</h1>
      <h2>{userName} VS {opponentName ? opponentName : "???"}</h2>
      {
        opponentName && userState === "inactive" ?
          <h3>Wait for {opponentName} to make a choice</h3>
        : opponentName && userState === "ban" ?
          <h3>Choose a character to ban</h3>
        : opponentName && userState === "pick" ?
          <h3>Choose a character to play as</h3>
        :
          <h3>Waiting for an opponent to join</h3>
      }
      <DraftList></DraftList>
    </div>
  )
}

export default Draft;