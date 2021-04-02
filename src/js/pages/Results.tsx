import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetBannedCharacters, resetPickedCharacters, setUserState } from '../actions';
import CharacterPortrait from '../components/CharacterPortrait';
import PageHeader from '../components/PageHeader';
import { opponentNameSelector, pickedCharactersSelector, userNameSelector } from '../selectors';
import './Results.scss'
const Results = () => {
  const userName = useSelector(userNameSelector);
  const opponentName = useSelector(opponentNameSelector);
  const pickedCharactersObj = useSelector(pickedCharactersSelector);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userName) {
      history.push("/Home")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <PageHeader></PageHeader>
      <div className="results">
        <div className="userData">
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
        </div>

        <h1>VS</h1>

        <div className="opponentData">
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
        </div>        
      </div>
      <button className="soloButton" onClick={e => {
        e.preventDefault();
        dispatch(setUserState("start"));
        dispatch(resetBannedCharacters(true));
        dispatch(resetPickedCharacters(true));
        history.push("/Home")
      }}>Draft Again</button>
    </>
    
  )
}

export default Results;