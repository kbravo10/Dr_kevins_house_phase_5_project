import React from "react";

function ReportInfo({ report }) {
  return (
    <div>
      <a>
        {report.type_of_report}- {report.client_name}
      </a>
    </div>
  );
}

export default ReportInfo;
