import "./CharacterPortrait.scss";

type CharacterPortraitProps = {
  charName: string;
  game: string;
  className: any,
  style?: any,
  onClick?: () => void;
}

const CharacterPortrait = ( {charName, game, className, style, onClick }: CharacterPortraitProps ) => {

  return(
    <img
      className={`characterContainer ${className}`}
      style={style}
      alt={`${charName} portrait`}
      src={`${process.env.PUBLIC_URL}/assets/images/characters/${game.toLowerCase()}/${charName}.png`}
      onClick={onClick}
    />
  )
}


export default CharacterPortrait;