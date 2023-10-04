import React, { useEffect, useState } from "react";

function ClientInfo({ clientInfo }) {
  return (
    <div className="cardInfo">
      <h2>Name: {clientInfo.name}</h2>
      <h2>Age: {clientInfo.age}</h2>
      <h2>Doctor: {clientInfo.doctor.name}</h2>
    </div>
  );
}

export default ClientInfo;
