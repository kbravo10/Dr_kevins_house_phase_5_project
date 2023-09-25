import React, { useEffect, useState } from "react";

function Doctors(){

    //declare usestate to assign json data
    const [doctors, setDoctors] = useState([])

    //useeffect to only render once
    useEffect(() =>{
        fetch("http://127.0.0.1:4000/doctors")
        .then((r) => (r.json()))
        .then((data) => (console.log(data)))
    },[])

    return(
        <h1>Doctors</h1>
    )
}

export default Doctors;