import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Report() {
  // usestate to get the fetch
  const [reports, setReports] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);

  //fetch statem,ent to get data from report from backend
  useEffect(() => {
    fetch("/reports")
      .then((r) => r.json())
      .then((data) => setReports((reports) => (reports = data)));
  }, []);

  //declare requirements for report form
  const formSchema = yup.object().shape({
    type_of_report: yup.string(),
    context: yup
      .string()
      .min(20)
      .required("Must be at least 20 characters long."),
    client_id: yup.number().integer().positive(),
  });

  //handle making reports with the correct inputs
  const formik = useFormik({
    initialValues: {
      type_of_report: "",
      context: "",
      client_id: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((r) => {
        if (r.status == 201) {
          setRefresh((refresh) => (refresh = true));
        }
      });
    },
  });
  return (
    <div>
      <h1>REPORTS</h1>
      <button onClick={() => setVisible(true)}>View reports</button>
      {visible
        ? reports.map((report, index) => {
            return (
              <div key={index}>
                <Link className="link" to={`/reports/${report.id}`}>
                  {report.type_of_report} -- {report.client_name} -- {report.time_stamp}
                </Link>
              </div>
            );
          })
        : null}
      <br></br>
      <div className="reportDiv">
        <h2>Make report</h2>
        <form className="reportForm" onSubmit={formik.handleSubmit}>
          <div className="reportTypeDiv">
            <label htmlFor="type_of_report">Type of Report</label>
            <br></br>
            <select
              id="type_of_report"
              name="type_of_report"
              onChange={formik.handleChange}
            >
              <option value="none">none</option>
              <option value="small injury">Small Injury</option>
              <option value="Emergency">Emergency</option>
              <option value="End of shift">End of Shift</option>
            </select>
          </div>
          <p style={{ color: "red" }}> {formik.errors.type_of_report}</p>
          <div className="clientReport">
            <label htmlFor="client_id">
              Client involved- if no client involved leave blank
            </label>
            <input
              id="client_id"
              name="client_id"
              onChange={formik.handleChange}
              value={formik.values.client_id}
            />
          </div>
          <p style={{ color: "red" }}> {formik.errors.client_id}</p>
          <div className="contextDiv">
            <label htmlFor="context">Report Summary</label>
            <br></br>
            <textarea
              style={{width:'60vw', height: '10vw', text:'left'}}
              type="text"
              id="context"
              name="context"
              onChange={formik.handleChange}
              value={formik.values.context}
            />
          </div>
          <p style={{ color: "red" }}> {formik.errors.context}</p>
          <button type="submit">Submit Report</button>
        </form>
      </div>
    </div>
  );
}

export default Report;
