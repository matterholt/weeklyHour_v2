import React from "react";
function TimeInputs({ inputTitle, timeValue, UpdateTimeValue }) {
  return (
    <div className="logPunchInputs">
      <p>{inputTitle}</p>
      <input
        type="time"
        value={timeValue}
        onChange={x => {
          UpdateTimeValue(x);
        }}
      />
    </div>
  );
}
export default TimeInputs;
