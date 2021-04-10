import WaitingImage from '../../images/waiting.png';
import style from './WaitingSpinner.module.scss'

const WaitingSpinner = () => 
  <img className={style.waitingSpinner} alt="waiting-spinner" src={WaitingImage} />

export default WaitingSpinner;