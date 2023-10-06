import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ClientInfo() {
  const [client, setClient] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`/clients/${params.id}`)
      .then((r) => r.json())
      .then((data) => setClient(data));
  }, [params.id]);
  return (
    <div className="cardInfo">
      <div className="descriptionDiv">
        <div className="descriptionCard">
          <h3>Name: {client.name}</h3>
          <h2>Age: {client.age}</h2>
        </div>
        <img
          className="cardImage"
          alt="oops"
          src="https://nonsa.pl/images/thumb/1/11/Ash_ketchum.jpg/1200px-Ash_ketchum.jpg"
        />
      </div>
      <div className="medicalContactDiv">
        <h3>Doctor: {client.doctor}</h3>
        <h3>email: {client.doctor_email}</h3>
      </div>
    </div>
  );
}

export default ClientInfo;
