import React, { useEffect } from "react";

function Report(){
    // usestate to get the fetch 
    const [reports, setReports] = useState([])
    return(
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
                <select>

                </select>
            </div>
        </form>
    )
}

export default Report;