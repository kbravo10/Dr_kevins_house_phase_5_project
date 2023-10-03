import React, { useState } from "react";

function MedTime({ mt, userInfo }) {
  //handle employee signing off time slot
  const [signedOff, setSignrdOff] = useState(mt.signed_off);
  function onHandleSignOff() {
    console.log(userInfo);
    setSignrdOff((signedOff) => (signedOff = userInfo.name));
    console.log(mt.id);
    fetch(`/medication_times/${mt.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        signed_off: userInfo.name,
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
