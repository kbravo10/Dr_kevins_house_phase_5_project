import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import MedTime from "./MedTime";
function Medication_times({ userInfo }) {
  //declare usestate to hold med times from backend project
  const [med_times, setMed_times] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [addButton, setAddButton] = useState(false);
  const [removeButton, setRemoveButton] = useState(false);

  //use fetch to quire data
  //useeffect to only render once
  useEffect(() => {
    fetch("/medication_times")
      .then((r) => r.json())
      .then((data) => setMed_times((med_times) => (med_times = data)));
  }, [refresh]);

  const formSchema = yup.object().shape({
    time_slot: yup.number().integer(),
    amount: yup.string(),
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
        body: JSON.stringify(values, null, 2),
      }).then((r) => {
        if (r.status == 201) {
          setRefresh(true);
        }
      });
    },
  });

  function handleDeleteTime(event) {
    event.preventDefault();
    const deleteTime = Object.fromEntries(new FormData(event.target).entries());
    fetch(`/medication_times/${deleteTime.timeSlotId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((data) => setRefresh(true));
  }

  return (
    <div className="text-center">
      <h1>Medication Schedule</h1>
      <div>
        <button onClick={() => setAddButton(!addButton)}>ADD TIME SLOT</button>
        <button onClick={() => setRemoveButton(!removeButton)}>
          REMOVE TIME SLOT
        </button>
      </div>
      {addButton ? (
        <div className="addTimeDiv">
          <form className="addMedTimeButton" onSubmit={formik.handleSubmit}>
            <br></br>
            <label htmlFor="time_slot">time slot</label>
            <select
              id="time_slot"
              name="time_slot"
              onChange={formik.handleChange}
            >
              {[...Array(24).keys()].map((time, index) => {
                return (
                  <option key={index} value={time}>
                    {time}:00
                  </option>
                );
              })}
            </select>

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
        </div>
      ) : null}
      {removeButton ? (
        <div className="removeTimeDiv">
          <form className="removeTime" onSubmit={handleDeleteTime}>
            <div name="timeSlotId">
              <label>Choose a time to delete</label>
              <select name="timeSlotId">
                {med_times.map((mt, index) => {
                  return (
                    <option key={index} value={mt.id}>
                      Time: {mt.time_slot} Client: {mt.clients.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button type="submit">Remove Sheduled Time</button>
          </form>
        </div>
      ) : null}
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
