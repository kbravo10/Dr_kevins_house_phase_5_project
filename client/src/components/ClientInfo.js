import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ClientInfo() {
  const [client, setClient] = useState([])
  const params = useParams()

  useEffect(() => {
    fetch(`/clients/${params.id}`)
    .then((r) => r.json())
    .then((data) => setClient(data))
  }, [params.id])
  return (
    <div className="cardInfo">
      <h2>Name: {client.name}</h2>
      <h2>Age: {client.age}</h2>
      <h2>Doctor: {client.doctor} email: {client.doctor_email}</h2>
    </div>
  );
}

export default ClientInfo;
