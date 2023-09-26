import React from "react";

function MedTime({mt}){
    return(
        <>
            <tbody>
                <tr>
                    <td>{mt.time_slot}</td>
                    <td>{mt.signed_off}</td>
                    <td>{mt.client_id}</td>
                    <td>{mt.medication_id}</td>
                </tr>
            </tbody>
        </>
    )
}

export default MedTime;