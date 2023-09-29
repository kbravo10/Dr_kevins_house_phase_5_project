import React, { useState } from "react";

function MedTime({ mt }) {
  //handle employee signing off time slot
  const [signedOff, setSignrdOff] = useState(mt.signed_off);
  function onHandleSignOff() {
    console.log(mt.employee);
    setSignrdOff((signedOff) => (signedOff = mt.id));
    console.log(mt.id);
    fetch(`http://127.0.0.1:4000/medication_times/${mt.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signed_off: (3).toString(),
      }),
    }).then((res) => res.json());
  }
  return (
    <>
      <tbody>
        <tr className="text-start">
          <td>{mt.time_slot}</td>
          <td>
            <button onClick={onHandleSignOff}>{signedOff}</button>
          </td>
          <td>
            {mt.client_id}. {mt.clients.name}
          </td>
          <td>
            {mt.medication_id}. {mt.medications.name}
          </td>
        </tr>
      </tbody>
    </>
  );
}

export default MedTime;
