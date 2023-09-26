import React from "react";

function MedInfo({med}){
    return(
        <tbody>
            <tr class="text-start">
                <td scope="row">{med.name}</td>
                <td>{med.medication_use}</td>
            </tr>
            <p></p>
        </tbody>
    )
}

export default MedInfo;