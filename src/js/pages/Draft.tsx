import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setRoomCode } from "../actions";
import './Draft.scss'; 
import { draftLogSelector, opponentNameSelector, roomCodeSelector, userNameSelector, userStateSelector } from "../selectors";
import DraftList from "../components/DraftList";
import NameInput from "../components/NameInput";
import PageHeader from "../components/PageHeader";

import WaitingImage from '../../images/waiting.png';
import { draftLogReducer } from "../reducers/draftlogs";

const Draft = () => {
   
  const userName = useSelector(userNameSelector);
  const roomCode = useSelector(roomCodeSelector);
  const opponentName = useSelector(opponentNameSelector);
  const userState = useSelector(userStateSelector);
  const draftLog = useSelector(draftLogSelector);

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
    <>
      <PageHeader></PageHeader>
      <div className="draft">

        {!opponentName && userName &&
          <>
            <h2><span className="user">{userName}</span> VS <span className="opponent">???</span></h2>
            <h3>Waiting for an opponent to join</h3>
            <div className="orbitCenter">
              <img alt="waiting-spinner" src={WaitingImage} className="waitingImage" />
            </div>
            <h4>Invite</h4>
            <p>{`https://fullmeter.com/fatdraft/#/Draft/${roomCode}`}</p>
          </>
        }

        {!userName &&
          <>
            <h2>Enter a name to join the draft</h2>
            <NameInput></NameInput>
          </>
        }

        {opponentName && 
          <h2><span className="user">{userName}</span> VS <span className="opponent">{opponentName}</span></h2>
        }
        
        {
          opponentName && userState === "inactive" ?
            <h3>Waiting for <span className="opponent">{opponentName}</span> to make a choice</h3>
          : opponentName && userState === "ban" ?
            <h3>Choose a character to ban</h3>
          : opponentName && userState === "pick" ?
            <h3>Choose a character to play as</h3>
          : userState === "start" && slugs.roomCodeSlug !== ""            
        }
        <DraftList></DraftList>

        {opponentName &&
          <ul className="draftLog">
            {draftLog.map((log, index) =>
              index > draftLog.length - 6 &&
              <li>
                {log.startsWith("[usr]")
                  ? <span className="user">You</span>
                  : <span className="opponent">{opponentName}</span>
                }{log.substring(5)}
              </li>
            )}
            
          </ul>
        }
      </div>
    </>
  )
}

export default Draft;