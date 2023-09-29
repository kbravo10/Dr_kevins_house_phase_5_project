import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Inventory from "./Inventory";
import Medication_times from "./Medication_times";
import Clients from "./Clients";
import Medications from "./Medications";
import Doctors from "./Doctors";
import Employees from "./Employees";
import Report from "./Report";
import Login from "./Login";

function App() {
  //set a is logged in state to check if im logged in and display correct page
  //set name from login page and display at top for the welcome
  const [isLogged, setIsLogged] = useState(false);
  const [name, setName] = useState("");

  //check if logged in, if yes go to app page, if not display login page
  if (!isLogged) {
    return <Login onLogin={setIsLogged}/>;
  }



  return (
    <div className="App" class="text-center">
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
        <Route exact path="/reports">
          <Report />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
