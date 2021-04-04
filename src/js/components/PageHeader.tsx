import "./PageHeader.scss"
import Logo from "../../images/logo.png"
import { useHistory } from "react-router"

import GitImage from '../../images/git.svg';
import TwitterImage from '../../images/twitter.svg';
import HomeImage from '../../images/home.svg';
import PatreonImage from '../../images/patreon.svg';
import PaypalImage from '../../images/paypal.svg';

const PageHeader = () => {

  let history = useHistory();

  return(
    <header className="pageHeader">
      <div onClick={() => history.push("/Home")} className="logo"> 
        <img src={Logo} />
        <h1>FAT Draft</h1>
      <span className="outwardLinks">
        <a href="https://fullmeter.com" target="_blank"><div style={{ maskImage: `url(${HomeImage})`}} /></a>
        <a href="https://twitter.com/D4RK_ONION" target="_blank"><div style={{maskImage: `url(${TwitterImage})`}} /></a>
        <a href="https://github.com/D4RKONION/fat-draft" target="_blank"><div style={{maskImage: `url(${GitImage})`}} /></a>
        <a href="https://www.patreon.com/d4rk_onion" target="_blank"><div style={{maskImage: `url(${PatreonImage})`}} /></a>
        <a href="https://paypal.me/fullmeter" target="_blank"><div style={{maskImage: `url(${PaypalImage})`}} /></a>
      </span>
      
      </div>
    </header>
  )
}
export default PageHeader;