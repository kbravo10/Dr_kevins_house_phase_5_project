import React, { useEffect, useState } from "react";
import MedInfo from "./MedInfo";

function Medications(){

    //declare usestate to assign json data
    const [medications, setMedication] = useState([])

    //useeffect to only render once
    useEffect(() =>{
        fetch("http://127.0.0.1:4000/medications")
        .then((r) => (r.json()))
        .then((data) => setMedication((medications) => (medications = data)))
    },[])

    return(
        <div className="cards">
            <h1>List Medications</h1>
            <table class="container">
                <thead> 
                    <th scope="col">Medication Name</th>
                    <th scope="col">Description</th>
                </thead>
                {medications.map((med, index) =>{
                    return(
                        <MedInfo key={index} med={med}/>
                    )
                })}
            </table>
        </div>
    )
}

export default Medications;