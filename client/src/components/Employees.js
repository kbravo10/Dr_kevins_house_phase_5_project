import React, { useEffect, useState } from "react";
import EmployeeInfo from "./EmployeeInfo";

function Employees(){

    //declare usestate to assign json data
    const [employees, setEmployees] = useState([])

    //useeffect to only render once
    useEffect(() =>{
        fetch("http://127.0.0.1:4000/employees")
        .then((r) => (r.json()))
        .then((data) => setEmployees((employees) => (employees = data)))
    },[])

    return(
        <div className="cards">
            <h1>List of Employees</h1>
            {employees.map((empl, index) =>{
                return(
                    <div key={index} >
                        <EmployeeInfo employee={empl}/>
                    </div>
                )
            }
            )}
        </div>
    )
}

export default Employees;