import { useSelector } from "react-redux";
import { activeGameSelector, bannedCharactersSelector, draftCharactersSelector, pickedCharactersSelector, userStateSelector } from "../selectors";
import "./DraftList.scss"

import { WebSocketContext } from "../socket";
import { useContext } from "react";
import CharacterPortrait from "./CharacterPortrait";


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

  const pickedCharactersObj = useSelector(pickedCharactersSelector);
  const pickedCharactersArray: string[] = [];
  Object.keys(pickedCharactersObj).forEach( charArray =>
    pickedCharactersObj[charArray].forEach( (charName: string) => {
      pickedCharactersArray.push(charName);
    })
  )


  const userState = useSelector(userStateSelector);
  const activeGame = useSelector(activeGameSelector);

  return(
    <div className="draftList">
      {draftCharacters.map(characterName =>
        <CharacterPortrait
          charName={characterName}
          game={activeGame}
          style={
            draftCharacters.length === 16 ?
              {width: "14%"} : null
          }
          className={`
            ${bannedCharactersArray.includes(characterName) ? "banned taken" : ""}
            ${pickedCharactersObj["user"].includes(characterName) ? "user picked taken" : ""}
            ${pickedCharactersObj["opponent"].includes(characterName) ? "opponent picked taken" : ""}
          `
          }
          key={`char-block-${characterName}`}
          onClick={() => {
            if (userState === "inactive" || bannedCharactersArray.includes(characterName) || pickedCharactersArray.includes(characterName)) {
              //not your turn or you chose a bad character
            } else if (userState === "ban") {
              ws.banCharacter(characterName);
            } else if (userState === "pick") {
              ws.pickCharacter(characterName);
            }
          }}
        />
      )}
    </div>
  )
}

export default DraftList;