import React, {useEffect, useState} from "react";

function Inventory(){
    //declare usestate to hold intructions information from backend project
    const [inventory, setInventory] = useState([]);

    // use fetch to aquire data
    //use effect to only render once 
    useEffect(() => {
        fetch("http://127.0.0.1:4000/inventory")
        .then((r) => r.json())
        .then((data) => console.log(data))
    }, [])

    return(
        <>
            <h1>inventory</h1>
        </>
    )
}

export default Inventory;