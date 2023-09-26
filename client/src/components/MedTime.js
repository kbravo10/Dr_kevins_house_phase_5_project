import React from "react";

function MedTime({mt}){
    return(
        <>
            <tbody >
                <tr class='text-start'>
                    <td>{mt.time_slot}</td>
                    <td>{mt.signed_off}</td>
                    <td>{mt.client_id}. {mt.clients.name}</td>
                    <td>{mt.medication_id}. {mt.medications.name}</td>
                </tr>
            </tbody>
        </>
    )
}

export default MedTime;