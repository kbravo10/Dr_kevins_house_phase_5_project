import React, { useEffect, useState } from "react";

function Employees(){

    //declare usestate to assign json data
    const [employees, setEmployees] = useState([])

    //useeffect to only render once
    useEffect(() =>{
        fetch("http://127.0.0.1:4000/medications")
        .then((r) => (r.json()))
        .then((data) => (console.log(data)))
    })

    return(
        <h1>Employees</h1>
    )
}

export default Employees;