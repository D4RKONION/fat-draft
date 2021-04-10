import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetBannedCharacters, resetPickedCharacters, setOpponentName, setOpponentState, setUserState, setUserLevel } from '../actions';
import CharacterPortrait from '../components/CharacterPortrait';
import PageHeader from '../components/PageHeader';
import { activeGameSelector, opponentIsConnectedSelector, opponentNameSelector, opponentStateSelector, pickedCharactersSelector, userNameSelector, userStateSelector } from '../selectors';
import { WebSocketContext } from '../socket';
import './Results.scss'

const Results = () => {

  const ws = useContext<any>(WebSocketContext);
  const userName = useSelector(userNameSelector);
  const userState = useSelector(userStateSelector);
  const opponentName = useSelector(opponentNameSelector);
  const opponentState = useSelector(opponentStateSelector);
  const opponentIsConnected = useSelector(opponentIsConnectedSelector);
  const pickedCharactersObj = useSelector(pickedCharactersSelector);
  const activeGame = useSelector(activeGameSelector);

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
                style={{width: pickedCharactersObj.user.length > 2 ? "26%" : null}}
                game={activeGame}
                className="characterContainer user picked"
                key={`char-block-${charName}`}
              />
            )}
          </div>

          {
            !opponentIsConnected ?
              <>
                <h3 style={{marginBottom: 0}}>Your opponent disconnected</h3>
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
            : userState === "requesting-redraft" ?
              <h3>Waiting for opponent...</h3>
            : 
              <button className="soloButton" onClick={e => {
                e.preventDefault();
                ws.voteRedraft();
              }}>Draft Again</button>
          }
        </div>

        <div className="playerData opponentData">
          <h2 className="opponent">{opponentName}</h2>   
          <div className="characterList">   
            {pickedCharactersObj.opponent.map((charName:string) => 
              <CharacterPortrait
                charName={charName}
                style={{width: pickedCharactersObj.opponent.length > 2 ? "26%" : null}}
                game={activeGame}
                className="characterContainer opponent picked"
                key={`char-block-${charName}`}
              />
            )}
          </div>
          
          {
            !opponentIsConnected ?
              <h3>Disconnected</h3>
            : opponentState !== "requesting-redraft" ?
              <h3>Deciding...</h3>
            :
              <h3>Requesting Redraft...</h3>
          }
        </div>        
      </div>
      
    </>
    
  )
}

export default Results;