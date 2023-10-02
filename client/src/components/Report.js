import React, { useEffect, useState } from "react";
import ReportInfo from "./ReportInfo";

function Report() {
  // usestate to get the fetch
  const [reports, setReports] = useState([]);

  //fetch statem,ent to get data from report from backend
  useEffect(() => {
    fetch("https://phase-5-api-o5ni.onrender.com/reports")
      .then((r) => r.json())
      .then((data) => setReports((reports) => (reports = data)));
  }, []);
  return (
    <div>
      <h1>REPORTS</h1>
      <h2>View reports</h2>
      {reports.map((report, index) => {
        return <ReportInfo key={index} report={report} />;
      })}
      <h2>Make report</h2>
      <form className="reportForm">
        <div className="reportTypeDiv">
          <label>Type of Report</label>
          <br></br>
          <select>
            <option value="none"></option>
            <option value="small injury">Small Injury</option>
            <option value="emergency">Emergency</option>
            <option value="end of shift">End of Shift</option>
          </select>
        </div>
        <div className="clientReport">
          <label>Client involved- if no client involved leave blank</label>
          <input type="text" name="clientInfo"></input>
        </div>
        <div className="contextDiv">
          <input type="text" name="context"></input>
        </div>
      </form>
    </div>
  );
}

export default Report;
