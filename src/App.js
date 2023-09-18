import {Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Passdown from "./components/Passdown";
import Safety from "./components/Safety";



function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Passdown">
          <Passdown />
        </Route>
        <Route exact path="/Safety">
          <Safety />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
