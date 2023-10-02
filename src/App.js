import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SearchPassdown from "./components/SearchPassdown";
import Passdown from "./components/Passdown";
import CreatePassdown from "./components/CreatePassdown";
import React, { useEffect, useState } from "react";

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
        <Route exact path="/passdown/searchPassdown"
          render={(routeProps) =>
            <SearchPassdown {...routeProps} />}
        />
        <Route exact path="/passdown/createPassdown"
          render={(routeProps) =>
            <CreatePassdown {...routeProps} />}
        />
      </Switch>
    </div>
  );
}

export default App;

