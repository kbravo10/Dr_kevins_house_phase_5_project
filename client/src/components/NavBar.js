import { Button } from "bootstrap";
import React from "react";
import { NavLink } from "react-router-dom";

//returns a navigation bar with links to a desired path
function NavBar({onLogout}) {
  function onHandleLogout(){
    fetch("http://127.0.0.1:4000/logout", {
      method: "DELETE"})
      .then((r) => onLogout(null))
  }

  return (
    <div className="navbar" class="inline-block">
      <NavLink to="/clients" exact className="navlink">
        List of Clients
      </NavLink>
      <NavLink to="/medication_times" exact className="navlink">
        Medication Schedule
      </NavLink>
      <NavLink to="/inventory" exact className="navlink">
        Inventory
      </NavLink>
      <NavLink to="/medications" exact className="navlink">
        Medications
      </NavLink>
      <NavLink to="/doctors" exact className="navlink">
        List of Doctors
      </NavLink>
      <NavLink to="/employees" exact className="navlink">
        List of Employees
      </NavLink>
      <NavLink to="/reports" exact className="navlink">
        REPORTS
      </NavLink>
      <button onClick={onHandleLogout}>
        log-out
      </button>
    </div>
  );
}
export default NavBar;
