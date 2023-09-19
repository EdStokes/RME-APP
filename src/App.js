import {Route, Switch} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Passdown from "./components/Passdown";
import Safety from "./components/Safety";
import React, {useEffect, useState} from "react";



function App() {

  const [techs, setTechs] = useState([]);

  function handleTechs(techs) {
    setTechs(techs)
  }
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home  techs={techs} onTechUpdate={handleTechs}/>
        </Route>
        <Route exact path="/Passdown">
          <Passdown techs={techs}/>
        </Route>
        <Route exact path="/Safety">
          <Safety />
        </Route>
      </Switch>
    </div>
  );
}

export default App;