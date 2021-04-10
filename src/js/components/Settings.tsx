import { useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { userNameSelector } from "../selectors";
import { WebSocketContext } from "../socket";
import Option from "./Option"

const Settings = () => {
  
  const ws = useContext<any>(WebSocketContext);

  const userName = useSelector(userNameSelector);

  const [activeGame, setActiveGame] = useState("SFV");
  const [numberOfCharacters, setNumberOfCharacters] = useState("8");
  const [numberOfPicks, setNumberOfPicks] = useState("2");

  useEffect(() => {
    ws.socket.io.opts.extraHeaders.activegame = activeGame;
    ws.socket.io.opts.extraHeaders.numberofcharacters = numberOfCharacters;
    ws.socket.io.opts.extraHeaders.numberofpicks = numberOfPicks;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[activeGame, numberOfCharacters, numberOfPicks])


  const OPTIONS = {
    games: {
      heading: "Choose a game",
      description: "Determines what game will be drafted. We'll be adding more in the future!",
      choices: ["3S", "USF4", "SFV"],
      currentChoice: activeGame,
      onClick: (game: string) => setActiveGame(game)
    },
    characters: {
      heading: "Number of characters",
      description: "Determines how many characters will be displayed in the initial grid. The higher this number, the longer the draft will take",
      choices: ["8", "16"],
      currentChoice: numberOfCharacters,
      onClick: (numOfCharacters:string) => setNumberOfCharacters(numOfCharacters)
    },
    picks: {
      heading: "Number of picks",
      description: "Determines how many characters you and your opponent will end up with. We recommend two so that counterpicking isn't super easy.",
      choices: ["1", "2", "3"],
      currentChoice: numberOfPicks,
      onClick: (numOfPicks:string) => setNumberOfPicks(numOfPicks)
    },
  }

  return (
    <>
      <div className="options">
        {Object.keys(OPTIONS).map((row) =>
          <Option key={`option-group-${row}`} buttons={OPTIONS[row as keyof typeof OPTIONS]}></Option>
        )}
      </div>
      {userName &&
        <button className="soloButton" onClick={e => {
          e.preventDefault();
          ws.startNewDraft({activeGame, numberOfCharacters, numberOfPicks});
        }}>Let's Draft!</button>
      }
    </>

  
    
  )
}

export default Settings;