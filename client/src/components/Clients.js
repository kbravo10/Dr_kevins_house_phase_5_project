import React, {useState, useEffect} from "react";

function Clients(){

    //declare usestate to get data from backend
    const [clients, setClients] = useState([])

    //useeffect to only render once fetch 
    useEffect(() =>{
        fetch("http://127.0.0.1:4000/clients")
        .then((r) => (r.json()))
        .then((data) => (console.log(data)))
    }
    )

    return(
        <h1>clients</h1>
    )
}

export default Clients;