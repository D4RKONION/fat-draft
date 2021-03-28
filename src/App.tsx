import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Draft from "./js/pages/Draft";
import Home from "./js/pages/Home";






const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route path={`/Draft/:roomCodeSlug`}>
            <Draft />
          </Route>

          <Route path={`/`}>
            <Home />
          </Route>
        </Switch>					
      </Router>        
    </div>
  )
};


export default App;