import React from "react";

function MedInfo({med}){
    return(
        <tbody>
            <td scope="row">{med.name}</td>
            <td>{med.medication_use}</td>
        </tbody>
    )
}

export default MedInfo;