import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Inventory from "./Inventory";
import Medication_times from "./Medication_times";
import Clients from "./Clients";
import Medications from "./Medications";
import Doctors from "./Doctors";
import Employees from "./Employees";

function App() {

  return (
    <div className="App">
      <h1>Dr.Kevins House</h1>
      <NavBar />
      <Switch>
        <Route exact path="/inventory">
          <Inventory />
        </Route>
        <Route exact path="/medication_times">
          <Medication_times />
        </Route>
        <Route exact path="/clients">
          <Clients />
        </Route>
        <Route exact path="/medications">
          <Medications />
        </Route>
        <Route exact path="/doctors">
          <Doctors />
        </Route>
        <Route exact path="/employees">
          <Employees />
        </Route>
      </Switch>
    </div>
  )


}

export default App;
