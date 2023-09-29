import React from "react";

function MedTime({mt}){

    //handle employee signing off time slot
    function onHandleSignOff(){
        
    }
    return(
        <>
            <tbody >
                <tr class='text-start'>
                    <td>{mt.time_slot}</td>
                    <td>
                        <button>{mt.signed_off}</button>
                    </td>
                    <td>{mt.client_id}. {mt.clients.name}</td>
                    <td>{mt.medication_id}. {mt.medications.name}</td>
                </tr>
            </tbody>
        </>
    )
}

export default MedTime;