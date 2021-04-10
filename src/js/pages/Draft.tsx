import { useEffect, useState } from "react";
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
   
  const [messageToUser, setMessageToUser] = useState("Here we go!")

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

  useEffect(() => {
    let mostRecentLog = ""
    if (draftLog.length > 0) {
      mostRecentLog = `${draftLog[draftLog.length - 1].startsWith("[usr]")
      ? "You"
      : opponentName}${draftLog[draftLog.length - 1].substring(5)}`
    } else {
      mostRecentLog = "Here we go!"
    }
    
    setMessageToUser(mostRecentLog);
    setTimeout(() => {
      if (userState === "inactive") {
        setMessageToUser(`Waiting for ${opponentName} to make a choice`)
      } else if (userState === "ban") {
        setMessageToUser("Choose a character to ban")
      } else if (userState === "pick") {
        setMessageToUser("Choose a character to play as")
      }   
    }, 1000)


    
  }, [draftLog, userState, opponentName])

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
          <>
          <h2><span className="user">{userName}</span> VS <span className="opponent">{opponentName}</span></h2>
          <p><span>Makoto</span> VS <span>Ibuki</span></p>
          </>
        }
        
        {opponentIsConnected &&
          <h3>{messageToUser}</h3>       
        }

        {opponentIsConnected &&
          <DraftList></DraftList>
        }

      </div>
    </>
  )
}

export default Draft;