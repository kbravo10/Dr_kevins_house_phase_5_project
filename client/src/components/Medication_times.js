import React, {useEffect, useState} from "react";
import MedTime from "./MedTime";
function Medication_times(){
    //declare usestate to hold med times from backend project
    const [med_times, setMed_times] = useState([]);

    //use fetch to quire data
    //useeffect to only render once
    useEffect(() => {
        fetch("http://127.0.0.1:4000/medication_times")
        .then((r) => (r.json()))
        .then((data) => setMed_times((med_times) => (med_times = data)))

        console.log("")
    },[])

    return(
        <div class="text-center">
            <h1>Medication Schedule</h1>
            <table className="medTimeTable">
                <thead>
                    <th scope="col">TIME</th>
                    <th scope="col">SIGNED OFF</th>
                    <th scope="col">CLIENT I.D.</th>
                    <th scope="col">MEDICATION I.D.</th>
                </thead>
                {med_times.map((mt, index) =>{
                    return(
                        <MedTime key={index} mt={mt}/>
                    )
                })}
            </table>
        </div>
    )
}

export default Medication_times;