type CharacterPortraitProps = {
  charName: string;
  game: string;
  className: any,
  onClick?: () => void;
}

const CharacterPortrait = ( {charName, game, className, onClick }: CharacterPortraitProps ) => {

  return(
    <img
      className={className}
      alt={`${charName} portrait`}
      src={`${process.env.PUBLIC_URL}/assets/images/characters/${game.toLowerCase()}/${charName}.png`}
      onClick={onClick}
    />
  )
}


export default CharacterPortrait;