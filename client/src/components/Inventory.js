import React, {useEffect, useState} from "react";

function Inventory(){
    //declare usestate to hold intructions information from backend project
    const [inventory, setInventory] = useState([]);

    // use fetch to aquire data
    //use effect to only render once 
    useEffect(() => {
        fetch("http://127.0.0.1:4000/inventory")
        .then((r) => r.json())
        .then((data) => setInventory((inventory) => (inventory = data)))
    }, [])

    return(
        <div>
            <h1>Inventory</h1>
            <table className="container">
                <thead class='text-start'>
                    <tr>
                        <th>Object</th>
                        <th>Number in Storage</th>
                        <th>Instructions</th>
                    </tr>
                </thead>
                    {inventory.map((inv, index) =>{
                        return(
                            <tbody key={index}>
                                <tr class="text-start">
                                    <td>{inv.inventory}</td>
                                    <td>{inv.count_inventory}</td>
                                    <td>{inv.instructions}</td>
                                </tr>
                            </tbody>
                        )
                    })

                    }
                
            </table>
        </div>
    )
}

export default Inventory;