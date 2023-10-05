import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ReportInfo() {
  const [report, setReport] = useState([])
  const params = useParams()

  useEffect(() =>{
    fetch(`/reports/${params.id}`)
    .then((r) => r.json())
    .then((data) => setReport((report) => (report = data)))
  },[params.id])

  return (
    <div>
      <p>
        {report.type_of_report}- {report.client_name}
      </p>
      <p>{report.context}</p>
    </div>
  );
}

export default ReportInfo;
