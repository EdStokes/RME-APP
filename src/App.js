import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SearchPassdown from "./components/SearchPassdown";
import Passdown from "./components/Passdown";
import CreatePassdown from "./components/CreatePassdown";
import React, { useEffect, useState } from "react";

function App() {
  const [addWorkButton, setAddworkButton] = useState(false);
  const handleAddworkButton = () => {
    setAddworkButton(!addWorkButton);
  }

  const [submitPassdownButton, setSubmitPassdownButton] = useState(false);
  const handleSubmitPassdownButton = () => {
   setSubmitPassdownButton(!submitPassdownButton);
  }

  const [shiftEditButton, setShiftEditButton] = useState(false);
  const handleShiftEditButton = () => {
    setShiftEditButton(!shiftEditButton)
  }

  return (
    <div>
      <NavBar 
      handleAddworkButton={handleAddworkButton} 
      handleSubmitPassdownButton={handleSubmitPassdownButton}
      handleShiftEditButton={handleShiftEditButton}
       />
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
            <CreatePassdown 
            {...routeProps} 
            addWorkButton={addWorkButton} 
            handleAddworkButton={handleAddworkButton}
            submitPassdownButton={submitPassdownButton}
            handleSubmitPassdown={handleSubmitPassdownButton}
            shiftEditButton={shiftEditButton}
            handleShiftEditButton={handleShiftEditButton}
            />}
        />
      </Switch>
    </div>
  );
}

export default App;

