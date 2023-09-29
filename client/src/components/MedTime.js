import React, { useState } from "react";

function MedTime({mt}){

    //handle employee signing off time slot
    const [signedOff, setSignrdOff] = useState(mt.signed_off)
    function onHandleSignOff(){
        setSignrdOff((signedOff) => (signedOff = 1))
    }
    return(
        <>
            <tbody >
                <tr className='text-start'>
                    <td>{mt.time_slot}</td>
                    <td>
                        <button onClick={onHandleSignOff}>{signedOff}</button>
                    </td>
                    <td>{mt.client_id}. {mt.clients.name}</td>
                    <td>{mt.medication_id}. {mt.medications.name}</td>
                </tr>
            </tbody>
        </>
    )
}

export default MedTime;