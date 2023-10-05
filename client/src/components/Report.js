import React, { useEffect, useState } from "react";
import ReportInfo from "./ReportInfo";
import * as yup from "yup";
import { useFormik } from "formik";

function Report() {
  // usestate to get the fetch
  const [reports, setReports] = useState([]);
  const [refresh, setRefresh] = useState(false);


  //fetch statem,ent to get data from report from backend
  useEffect(() => {
    fetch("/reports")
      .then((r) => r.json())
      .then((data) => setReports((reports) => (reports = data)));
  }, []);

  //declare requirements for report form
  const formSchema  = yup.object().shape({
    type_of_report: yup.string(),
    context: yup.string().min(20).required("Must be at least 20 characters long."),
    client_id: yup.number().integer().positive(),
  })

  //handle making reports with the correct inputs
  const formik = useFormik({
    initialValues:{
      type_of_report: "",
      context: "",
      client_id: ""
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("reports", {
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((r) => {
        if(r.status == 201){
          setRefresh((refresh) => (refresh = true))

        }}
        )
    }
  })
  return (
    <div>
      <h1>REPORTS</h1>
      <h2>View reports</h2>
      {reports.map((report, index) => {
        return <ReportInfo key={index} report={report} />;
      })}
      <h2>Make report</h2>
      <form className="reportForm" onSubmit={formik.handleSubmit}>
        <div className="reportTypeDiv">
          <label htmlFor="type_of_report">Type of Report</label>
          <br></br>
          <select id="type_of_report" name="type_of_report" onChange={formik.handleChange}>
            <option value='none'>none</option>
            <option value='small injury'>Small Injury</option>
            <option value='Emergency'>Emergency</option>
            <option value='End of shift'>End of Shift</option>
          </select>
        </div>
        <div className="clientReport">
          <label htmlFor="client_id">Client involved- if no client involved leave blank</label>
          <input id="client_id" name="client_id" onChange={formik.handleChange} value={formik.values.client_id}/>
        </div>
        <div className="contextDiv">
          <label htmlFor="context">Report Summary</label>
          <input id='context' name="context" onChange={formik.handleChange} value={formik.values.context}/>
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default Report;
