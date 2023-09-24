import React, {useEffect, useState} from "react";

function Medication_times(){
    //declare usestate to hold med times from backend project
    const [med_times, setMed_times] = useState([]);

    //use fetch to quire data
    //useeffect to only render once
    useEffect(() => {
        fetch("http://127.0.0.1:4000/medication_times")
        .then((r) => (r.json()))
        .then((data) => console.log(data))
    })

    return(
        <h1>Medication Schedule</h1>
    )
}

export default Medication_times;