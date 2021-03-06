import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import NameInput from "../components/NameInput";
import PageHeader from "../components/PageHeader";
import Settings from "../components/Settings";
import WaitingSpinner from "../components/WaitingSpinner";
import { roomCodeSelector, userNameSelector, userLevelSelector, userStateSelector, opponentNameSelector } from "../selectors";
import './Home.scss'

const Home = () => {

  const userName = useSelector(userNameSelector);
  const userState = useSelector(userStateSelector);
  const opponentName = useSelector(opponentNameSelector);
  const roomCode = useSelector(roomCodeSelector);
  const userLevel = useSelector(userLevelSelector);
  
  let history = useHistory();

  useEffect(() => {
    userState !== "start" &&
      history.push(`/Draft/${roomCode}`)
      
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState]);

  return (
    <>
      <PageHeader></PageHeader>
      <div className="home">
        {userName
          ? <h1>One more time, <span className="user">{userName}</span>!</h1>
          : <h1>Welcome to FAT Draft</h1>
        }
        {(userLevel === "unset" || userLevel === "host") &&
          <Settings></Settings>
        }
        
        {!userName
          && <NameInput></NameInput>
        }

      {opponentName && userName && userLevel === "guest" &&
        <>
          <h3>Waiting for <span className="opponent">{opponentName}</span> to choose settings</h3>
          <h3>Don't refresh the page!</h3>
          <WaitingSpinner />
        </>
      }
      </div>
    </>

  );
}

export default Home;