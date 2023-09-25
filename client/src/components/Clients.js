import React, {useState, useEffect} from "react";
import ClientInfo from "./ClientInfo";

function Clients(){

    //declare usestate to get data from backend
    const [clients, setClients] = useState([])

    //useeffect to only render once fetch 
    useEffect(() =>{
        fetch("http://127.0.0.1:4000/clients")
        .then((r) => (r.json()))
        .then((data) => setClients((clients) => (clients = data)))
    },[]
    )

    return(
        <div className="cards">
            <h1>Clients</h1>
            {clients.map((client, index) => {
                return(
                    <div key={index} className="clientDisplay">
                        <ClientInfo key={index} clientInfo={client} />
                    </div>
                );
                })}
    
        </div>
    )
}

export default Clients;