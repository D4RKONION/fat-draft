import { useSelector } from "react-redux";
import { draftCharactersSelector } from "../selectors";
import styles from "./DraftList.module.scss"

import { WebSocketContext } from "../socket";
import { useContext } from "react";


const DraftList = () => {

  
  const ws = useContext<any>(WebSocketContext);  
  const draftCharacters = useSelector(draftCharactersSelector);

  return(
    <div className={styles.draftList}>
      {draftCharacters.map(characterName =>
        <span
          key={`char-block-${characterName}`}
          onClick={() => {
            ws.banCharacter(characterName)
          }}
        >{characterName}</span>
      )}
    </div>
  )
}

export default DraftList;