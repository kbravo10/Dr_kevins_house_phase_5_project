import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function ReportInfo() {
  const [report, setReport] = useState([]);
  const params = useParams();

  useEffect(() => {
    fetch(`/reports/${params.id}`)
      .then((r) => r.json())
      .then((data) => setReport((report) => (report = data)));
  }, [params.id]);

  return (
    <div className="reportDiv">
      <div className="reportHeaderDiv">
        <span>
          {report.type_of_report}- {report.client_name}
        </span>
      </div>
      <div className="contentDiv">
        <span>{report.context}</span>
      </div>
    </div>
  );
}

export default ReportInfo;
