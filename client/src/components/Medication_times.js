import React, { useEffect, useState } from "react";
import MedTime from "./MedTime";
function Medication_times({ userInfo }) {
  //declare usestate to hold med times from backend project
  const [med_times, setMed_times] = useState([]);

  //use fetch to quire data
  //useeffect to only render once
  useEffect(() => {
    fetch("https://phase-5-api-o5ni.onrender.com/medication_times")
      .then((r) => r.json())
      .then((data) => setMed_times((med_times) => (med_times = data)));
  }, []);

  return (
    <div className="text-center">
      <h1>Medication Schedule</h1>
      <table className="container">
        <thead className="text-start">
          <tr>
            <th scope="col">TIME</th>
            <th scope="col">SIGNED OFF</th>
            <th scope="col">CLIENT</th>
            <th scope="col">MEDICATION</th>
          </tr>
        </thead>
        {med_times.map((mt, index) => {
          return <MedTime key={index} mt={mt} userInfo={userInfo} />;
        })}
      </table>
    </div>
  );
}

export default Medication_times;
