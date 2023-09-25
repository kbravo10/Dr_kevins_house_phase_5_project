import React, { useEffect, useState } from "react";


function DoctorInfo({docInfo}){
    return(
        <div className="cardInfo">
            <h2>Name: {docInfo.name}</h2>
            <h2>Clients: </h2>
            {docInfo.clients.map((client, index) => {
                return(
                        <li key={index} className="listRelationship">
                            Name: {client.name}, ID: {client.id}
                        </li>
                )
            })}
        </div>
    )
}

export default DoctorInfo;