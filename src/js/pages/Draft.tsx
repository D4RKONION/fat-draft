import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { resetBannedCharacters, resetPickedCharacters, setOpponentName, setOpponentState, setRoomCode, setUserLevel, setUserState } from "../actions";
import './Draft.scss'; 
import { draftLogSelector, opponentIsConnectedSelector, opponentNameSelector, roomCodeSelector, userNameSelector, userStateSelector } from "../selectors";
import DraftList from "../components/DraftList";
import NameInput from "../components/NameInput";
import PageHeader from "../components/PageHeader";

import WaitingImage from '../../images/waiting.png';

const Draft = () => {
   
  const userName = useSelector(userNameSelector);
  const roomCode = useSelector(roomCodeSelector);
  const opponentName = useSelector(opponentNameSelector);
  const opponentIsConnected = useSelector(opponentIsConnectedSelector);
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

        {opponentName && !opponentIsConnected &&
          <>
            <h1>{opponentName} disconnected</h1>
            <button style={{marginTop: 0}} className="soloButton" onClick={e => {
              e.preventDefault();
              dispatch(setUserState("start"));
              dispatch(setUserLevel("host"));
              dispatch(setOpponentState("unset"));
              dispatch(setOpponentName(""))
              dispatch(resetBannedCharacters(true));
              dispatch(resetPickedCharacters(true));
              history.push("/Home")
            }}>Start Over</button>
          </>
        }

        {!opponentName && userName &&
          <div className="waitingContainer">
            <h1>Welcome <span className="user">{userName}</span>!</h1>
            <div className="imageBox">
              <h3>Waiting for <span className="opponent">an opponent</span> to join</h3>
              <img alt="waiting-spinner" src={WaitingImage} />
            </div>
            <div onClick={() => navigator.clipboard.writeText(`https://fullmeter.com/fatdraft/#/Draft/${roomCode}`)} className="inviteBox">
              <h4>Tap to copy invite link</h4>
              <p className="smallScreenHidden">{`https://fullmeter.com/fatdraft/#/Draft/${roomCode}`}</p>
            </div>
          </div>
        }

        {!userName &&
          <div className="joiningContainer">
            <h2>Enter <span className="user">a name</span> to join the draft</h2>
            <NameInput></NameInput>
          </div>
        }

        {opponentIsConnected && 
          <h2><span className="user">{userName}</span> VS <span className="opponent">{opponentName}</span></h2>
        }
        
        {
          opponentIsConnected && userState === "inactive" ?
            <h3>Waiting for <span className="opponent">{opponentName}</span> to make a choice</h3>
          : opponentIsConnected && userState === "ban" ?
            <h3>Choose a character to ban</h3>
          : opponentIsConnected && userState === "pick" ?
            <h3>Choose a character to play as</h3>
          : userState === "start" && slugs.roomCodeSlug !== ""            
        }
        {opponentIsConnected &&
          <DraftList></DraftList>
        }

        {opponentIsConnected &&
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