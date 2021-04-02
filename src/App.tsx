import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Draft from "./js/pages/Draft";
import Home from "./js/pages/Home";
import Results from "./js/pages/Results";
import "./App.scss"






const App = () => {
  return (
    <div className="App">
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
    </div>
  )
};


export default App;