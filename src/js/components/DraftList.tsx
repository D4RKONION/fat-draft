import { useSelector } from "react-redux";
import { bannedCharactersSelector, draftCharactersSelector, userStateSelector } from "../selectors";
import "./DraftList.scss"

import { WebSocketContext } from "../socket";
import { useContext } from "react";


const DraftList = () => {

  
  const ws = useContext<any>(WebSocketContext);  
  const draftCharacters = useSelector(draftCharactersSelector);
  const bannedCharactersObj = useSelector(bannedCharactersSelector);
  
  const bannedCharactersArray: string[] = [];
  Object.keys(bannedCharactersObj).forEach( charArray =>
    bannedCharactersObj[charArray].forEach( (charName: string) => {
      bannedCharactersArray.push(charName);
    })
  )
  console.log(bannedCharactersArray);

  const userState = useSelector(userStateSelector);

  return(
    <div className="draftList">
      {draftCharacters.map(characterName =>
        <div
          className={`${bannedCharactersArray.includes(characterName) ? "banned" : ""}`
          }
          key={`char-block-${characterName}`}
          onClick={() => {
            if (userState === "inactive" || bannedCharactersArray.includes(characterName)) {
              //not your turn or you chose a bad character
            } else if (userState === "ban") {
              ws.banCharacter(characterName)
            } else if (userState === "pick") {
              //pick a character
            }
          }}
        >
          <h3>{characterName}</h3>
        </div>
      )}
    </div>
  )
}

export default DraftList;