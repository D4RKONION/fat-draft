import "./Option.scss"

type Buttons = {
  buttons: {
    heading: string;
    description: string;
    choices: string[];
    currentChoice: string,
    onClick: (game: string) => void;
  }
}

const Option = ({ buttons }: Buttons) => {
  return (
    <div className="option">
      <h2>{buttons.heading}</h2>
      <p>{buttons.description}</p>
      <div className="optionButtons">
        {buttons.choices.map(buttonName => 
          <div key={`option-${buttons.heading}-${buttonName}`} className={`button ${buttonName === buttons.currentChoice ? "active" : "inactive"}`} onClick={() => buttons.onClick(buttonName)}>{buttonName}</div>
        )}
      </div>
      
    </div>
  )
}

export default Option;