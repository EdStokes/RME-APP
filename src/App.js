import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Passdown from "./components/Passdown";
import Safety from "./components/Safety";
import React, { useEffect, useState } from "react";
import PassdownForm from "./components/PassdownForm";



function App() {

  const [techs, setTechs] = useState([]);
  const [currentPassdownInfo, setCurrentPassdownInfo] = useState({});

  function handleTechs(techs) {
    setTechs(techs)
  }

  function handleCurrentPassdownInfo(passdownInfo) {
    setCurrentPassdownInfo(passdownInfo);
  }
  console.log(currentPassdownInfo)

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <Home techs={techs} onTechUpdate={handleTechs} />
        </Route>
        <Route exact path="/Passdown">
          <Passdown headerInfo={currentPassdownInfo} />
        </Route>
        <Route exact path="/Safety">
          <Safety />
        </Route>
        <Route exact path="/passdown/passdownForm"
          render={(routeProps) =>
            <PassdownForm {...routeProps} techs={techs}
              onSubmitPassdownInfo={handleCurrentPassdownInfo} />}
        />
      </Switch>
    </div>
  );
}

export default App;