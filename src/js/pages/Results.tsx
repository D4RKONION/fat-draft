import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetBannedCharacters, resetPickedCharacters, setOpponentState, setUserState } from '../actions';
import CharacterPortrait from '../components/CharacterPortrait';
import PageHeader from '../components/PageHeader';
import { opponentNameSelector, opponentStateSelector, pickedCharactersSelector, userNameSelector, userStateSelector } from '../selectors';
import { WebSocketContext } from '../socket';
import './Results.scss'

const Results = () => {

  const ws = useContext<any>(WebSocketContext);
  const userName = useSelector(userNameSelector);
  const userState = useSelector(userStateSelector);
  const opponentName = useSelector(opponentNameSelector);
  const opponentState = useSelector(opponentStateSelector);
  const pickedCharactersObj = useSelector(pickedCharactersSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userName) {
      history.push("/Home")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userState === "requesting-redraft" && opponentState === "requesting-redraft") {
      dispatch(setUserState("start"));
      dispatch(setOpponentState("unset"));
      dispatch(resetBannedCharacters(true));
      dispatch(resetPickedCharacters(true));
      history.push("/Home")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState, opponentState]);


  return (
    <>
      <PageHeader></PageHeader>
      <div className="results">
        <div className="playerData userData">
          <h2 className="user">{userName}</h2>
          <div className="characterList">
            {pickedCharactersObj.user.map((charName:string) => 
              <CharacterPortrait
                charName={charName}
                game="SFV"
                className="characterContainer user picked"
                key={`char-block-${charName}`}
              />
            )}
          </div>
          {userState !== "requesting-redraft"
            ? <button className="soloButton" onClick={e => {
                e.preventDefault();
                ws.voteRedraft();
              }}>Draft Again</button>
            : <h3>Waiting for opponent...</h3>

          }
          
        </div>

        <h1>VS</h1>

        <div className="playerData opponentData">
          <h2 className="opponent">{opponentName}</h2>   
          <div className="characterList">   
            {pickedCharactersObj.opponent.map((charName:string) => 
              <CharacterPortrait
                charName={charName}
                game="SFV"
                className="characterContainer opponent picked"
                key={`char-block-${charName}`}
              />
            )}
          </div>
          {opponentState !== "requesting-redraft"
            ? <h3>Deciding...</h3>
            : <h3>Requesting Redraft...</h3>
          }
        </div>        
      </div>
      
    </>
    
  )
}

export default Results;