import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Draft from "./js/pages/Draft";
import Home from "./js/pages/Home";
import Results from "./js/pages/Results";
import LightIcon from './images/light.png';
import DarkIcon from './images/dark.png';
import "./App.scss"
import "./style/light.scss"
import "./style/dark.scss"
import { useState } from "react";


const App = () => {
  
const [theme, setTheme] = useState("lightMode");

document.body.style.background = theme === "lightMode" ? "#ffffff" : "#1d1e20";
document.body.style.color = theme === "lightMode" ? "#000000" : "#f1f1ff";

  return (
    <div className={`App ${theme}`}>
      <Router>
        <Switch>

          <Route exact path={`/Results`}>
            <Results />
          </Route>

          <Route path={`/Draft/:roomCodeSlug`}>
            <Draft />
          </Route>

          <Route path={`/Home`}>
            <Home />
          </Route>
          <Redirect to="/Home"/>
        </Switch>					
      </Router>
      <div id="themeSwitcher" onClick={() => theme === "lightMode" ? setTheme("darkMode") : setTheme("lightMode")}><img src={theme === "lightMode" ? DarkIcon : LightIcon}/></div>      
    </div>
  )
};


export default App;