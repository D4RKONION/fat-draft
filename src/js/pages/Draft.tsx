import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setRoomCode } from "../actions";
import './Draft.scss'; 
import { opponentNameSelector, roomCodeSelector, userNameSelector, userStateSelector } from "../selectors";
import DraftList from "../components/DraftList";
import NameInput from "../components/NameInput";
import PageHeader from "../components/PageHeader";

const Draft = () => {
   
  const userName = useSelector(userNameSelector);
  const roomCode = useSelector(roomCodeSelector);
  const opponentName = useSelector(opponentNameSelector);
  const userState = useSelector(userStateSelector);

  const dispatch = useDispatch();

  let history = useHistory();

  const slugs:{roomCodeSlug: string} = useParams();

  useEffect(() => {
    if (roomCode === "" && slugs.roomCodeSlug) {
      dispatch(setRoomCode(slugs.roomCodeSlug));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userState === "finished") {
      history.replace("/Results")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  return (
    <div className="draft">
      <PageHeader></PageHeader>
      {userName
        ? <h2><span className="user">{userName}</span> VS <span className="opponent">{opponentName ? opponentName : "???"}</span></h2>
        : <h2>Enter a name to join the draft</h2>
      }
      {
        opponentName && userState === "inactive" ?
          <h3>Waiting for <span className="opponent">{opponentName}</span> to make a choice</h3>
        : opponentName && userState === "ban" ?
          <h3>Choose a character to ban</h3>
        : opponentName && userState === "pick" ?
          <h3>Choose a character to play as</h3>
        : userState === "start" && slugs.roomCodeSlug !== ""  ?
          <NameInput></NameInput>
        :
          <>
            <h3>Waiting for an opponent to join</h3>
            <h4>Invite</h4>
            <p>{`https://fullmeter.com/fatdraft/#/Draft/${roomCode}`}</p>
          </>
      }
      <DraftList></DraftList>
    </div>
  )
}

export default Draft;