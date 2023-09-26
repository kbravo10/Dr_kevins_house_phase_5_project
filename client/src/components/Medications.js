import React, { useEffect, useState } from "react";

function Medications(){

    //declare usestate to assign json data
    const [medications, setMedication] = useState([])

    //useeffect to only render once
    useEffect(() =>{
        fetch("http://127.0.0.1:4000/medications")
        .then((r) => (r.json()))
        .then((data) => (console.log(data)))
    },[])

    return(
        <h1>Medicationsss</h1>
    )
}

export default Medications;