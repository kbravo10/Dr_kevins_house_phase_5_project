import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import MedTime from "./MedTime";
function Medication_times({ userInfo }) {
  //declare usestate to hold med times from backend project
  const [med_times, setMed_times] = useState([]);
  const [refresh, setRefresh] = useState(false);

  //use fetch to quire data
  //useeffect to only render once
  useEffect(() => {
    fetch("/medication_times")
      .then((r) => r.json())
      .then((data) => setMed_times((med_times) => (med_times = data)));
  }, [refresh]);

  const formSchema = yup.object().shape({
    time_slot: yup.number("Must be a number").integer().positive().max(20),
    amount: yup.string(),
    signed_off: yup.string(),
    client_id: yup
      .number()
      .integer()
      .positive()
      .required("must enter valid id"),
    medication_id: yup
      .number()
      .integer()
      .positive()
      .required("must enter valid id"),
  });

  //handle the user wanting to add more medication times
  const formik = useFormik({
    initialValues: {
      time_slot: "",
      amount: "",
      signed_off: "",
      client_id: "",
      medication_id: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("medication_times", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null),
      }).then((r) => {
        if (r.status == 200) {
          setRefresh((refresh) => (refresh = true));
        }
      });
    },
  });

  // handle the user wanting to remove a time slot
  function onHandleDeleteSlot() {}

  return (
    <div className="text-center">
      <h1>Medication Schedule</h1>
      <div>
        <button >ADD TIME SLOT</button>
        <button >REMOVE TIME SLOT</button>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <br></br>
        <label htmlFor="timeSlot">time slot</label>
        <input
          id="time_slot"
          name="time_slot"
          onChange={formik.handleChange}
          value={formik.values.time_slot}
        />
        <p style={{ color: "red" }}> {formik.errors.time_slot}</p>
        <br></br>
        <label htmlFor="amount">enter amount</label>
        <input
          id="amount"
          name="amount"
          onChange={formik.handleChange}
          value={formik.values.amount}
        />

        <br></br>
        <label htmlFor="signed_off">enter your id or NA</label>
        <input
          id="signed_off"
          name="signed_off"
          onChange={formik.handleChange}
          value={formik.values.signed_off}
        />

        <br></br>
        <label htmlFor="signed_off">Enter the clients id</label>
        <input
          id="client_id"
          name="client_id"
          onChange={formik.handleChange}
          value={formik.values.client_id}
        />

        <br></br>
        <label htmlFor="signed_off">enter medication id</label>
        <input
          id="medication_id"
          name="medication_id"
          onChange={formik.handleChange}
          value={formik.values.medication_id}
        />
        <button type="submit">Submit</button>
      </form>
      <table className="container">
        <thead className="text-start">
          <tr>
            <th scope="col">TIME</th>
            <th scope="col">SIGNED OFF</th>
            <th scope="col">CLIENT</th>
            <th scope="col">MEDICATION</th>
          </tr>
        </thead>
        {med_times.map((mt, index) => {
          return <MedTime key={index} mt={mt} userInfo={userInfo} />;
        })}
      </table>
    </div>
  );
}

export default Medication_times;
