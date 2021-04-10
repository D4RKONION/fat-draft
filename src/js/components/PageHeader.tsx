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
        <img alt="Logo" src={Logo} />
        <h1><span className="smallScreenHidden">FAT</span> Draft</h1>
      </div>
      <span className="outwardLinks">
        <a href="https://fullmeter.com" rel="noreferrer" target="_blank"><div style={{ maskImage: `url(${HomeImage})`, WebkitMaskImage: `url(${HomeImage})`}} /></a>
        <a href="https://twitter.com/D4RK_ONION" rel="noreferrer" target="_blank"><div style={{maskImage: `url(${TwitterImage})`, WebkitMaskImage: `url(${TwitterImage})`}} /></a>
        <a href="https://github.com/D4RKONION/fat-draft" rel="noreferrer" target="_blank"><div style={{maskImage: `url(${GitImage})`, WebkitMaskImage: `url(${GitImage})`}} /></a>
        <a href="https://www.patreon.com/d4rk_onion" rel="noreferrer" target="_blank"><div style={{maskImage: `url(${PatreonImage})`, WebkitMaskImage: `url(${PatreonImage})`}} /></a>
        <a href="https://paypal.me/fullmeter" rel="noreferrer" target="_blank"><div style={{maskImage: `url(${PaypalImage})`, WebkitMaskImage: `url(${PaypalImage})`}} /></a>
      </span>
      
    </header>
  )
}
export default PageHeader;