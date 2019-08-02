import React, { useState, useEffect } from "react";
function getHours(time) {
  const [hr, min] = time.split(":");
  const hrToMin = Number(hr) * 60;
  const minRound = Math.round(Number(min / 10)) * 10;
  const totalMin = hrToMin + minRound;
  return totalMin;
}

function DailyTime(props) {
  const [punchIN, newPunchIN] = useState("08:00");
  const [punchOUT, newPunchOUT] = useState("16:30");
  // the two below could be in the parent component.
  const [dayHrs, updateDayHrs] = useState();

  useEffect(
    () => {
      // on any change in the component, after the render of component
      const lunchBreak = 0.5;
      const inTime = getHours(punchIN);
      const outTime = getHours(punchOUT);
      const hours = (outTime - inTime) / 60;
      const adjustedHr = hours - lunchBreak;
      updateDayHrs(adjustedHr.toFixed(1));
    },
    // reduce the time of update
    [punchOUT]
  );

