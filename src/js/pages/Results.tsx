import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetBannedCharacters, resetPickedCharacters, setBannedCharacters, setUserState } from '../actions';
import PageHeader from '../components/PageHeader';
import { opponentNameSelector, pickedCharactersSelector, userNameSelector } from '../selectors';
import './Results.scss'
const Results = () => {
  const userName = useSelector(userNameSelector);
  const opponentName = useSelector(opponentNameSelector);
  const pickedCharactersObj = useSelector(pickedCharactersSelector);

  const dispatch = useDispatch();
  const history = useHistory();


  return (
    <div className="results">
      <PageHeader></PageHeader>
      <h1>Results</h1>
      <h2>{userName} (you)</h2>
      {pickedCharactersObj.user.map((charName:string) => <h3>{charName}</h3>)}

      <h2>{opponentName}</h2>      
      {pickedCharactersObj.opponent.map((charName:string) => <h3>{charName}</h3>)}

      <div onClick={() => {
        dispatch(setUserState("start"));
        dispatch(resetBannedCharacters(true));
        dispatch(resetPickedCharacters(true));
        history.push("/Home")
      }}>Draft Again</div>
      
    </div>
  )
}

export default Results;