import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
function PunchIn({ punchIn, UpdatePunchIn }) {
  return (
    <div>
      <h3>Punch In:</h3>
      <input
        type="time"
        value={punchIn}
        onChange={x => {
          UpdatePunchIn(x);
        }}
      />
    </div>
  );
}
function PunchOut({ punchOut, UpdatePunchOut }) {
  return (
    <div>
      <h3>Punch Out:</h3>
      <input
        type="time"
        value={punchOut}
        onChange={x => {
          UpdatePunchOut(x);
        }}
      />
    </div>
  );
}

function DailyHrs({ updateTotal }) {
  const [punchIn, updatePunchIn] = useState("08:00");
  const [punchOut, updatePunchOut] = useState("16:30");

  function getHours(time) {
    const [hr, min] = time.split(":");
    const hrToMin = Number(hr) * 60;
    const minRound = Math.round(Number(min / 10)) * 10;
    const totalMin = hrToMin + minRound;
    return totalMin;
  }
  function addTotal() {
    const inTime = getHours(punchIn);
    const outTime = getHours(punchOut);
    const hours = (outTime - inTime) / 60 - 0.5;
    updateTotal(hours);
  }

  function UpdatePunchIn(e) {
    updatePunchIn(e.target.value);
  }
  function UpdatePunchOut(e) {
    updatePunchOut(e.target.value);
  }
  return (
    <div>
      <div className="logs">
        <PunchIn punchIn={punchIn} UpdatePunchIn={UpdatePunchIn} />
        <PunchOut punchOut={punchOut} UpdatePunchOut={UpdatePunchOut} />
        <div>
          <button onClick={addTotal}> ADD </button>
        </div>
      </div>
    </div>
  );
}

function TotalsForWk({ totalHr, weekend }) {
  const fiveDayWk = totalHr.reduce((a, b) => a + b, 0);
  const twoMoreDay = weekend.reduce((a, b) => a + b, 0);
  const hourAccrude = fiveDayWk + twoMoreDay;
  const belowForty = {
    color: "red"
  };
  const fortyAbove = {
    color: "green"
  };
  if (hourAccrude < 40) {
    return (
      <>
        <p style={belowForty}>
          TOTAL: <strong>{hourAccrude} </strong>hours
        </p>
      </>
    );
  } else {
    return (
      <>
        <p style={fortyAbove}>
          TOTAL: <strong>{hourAccrude} </strong>hours
        </p>
      </>
    );
  }
}

const DailyHrList = ({ totalHr, weekend }) => {
  const daysOfWk = ["MON", "TUES", "WED", "THUR", "FRI"];
  const daysOfWkend = ["SAT", "SUN"];
  const dailyHour = totalHr.map((x, y) => (
    <li key={y}>
      {daysOfWk[y]} {x} hr.
    </li>
  ));
  const wkendHour = weekend.map((x, y) => (
    <li key={y}>
      {daysOfWkend[y]} {x} hr.
    </li>
  ));
  return (
    <ul>
      {dailyHour} {wkendHour}
    </ul>
  );
};

function WeekHours() {
  const [totalHr, updateHours] = useState([]);
  const [weekend, updateWkend] = useState([]);
  const [wkTimes, updatewkTimes] = useState([]);
  const [reset, switchReset] = useState(false);

  function addTotal(hr) {
    if (totalHr.length !== 5) {
      updateHours([...totalHr, hr]);
      console.log(`working ${totalHr.length + 1} this week`);
    } else if (weekend.length !== 2) {
      updateWkend([...weekend, hr]);
      console.log(`working ${weekend.length + 1} this weekend`);
    } else {
      console.log("that is a NEW week");
      switchReset(true);
    }
  }
  function clearReset() {
    updateHours([]);
    updateWkend([]);
    switchReset(false);
  }

  return (
    <div>
      <h1>Weekly Hours</h1>
      <h1>Hours of week</h1>
      <TotalsForWk totalHr={totalHr} weekend={weekend} />

      {reset && (
        <div>
          <p>Full Week</p>
          <button onClick={clearReset}>CLEAR</button>
        </div>
      )}
      <button onClick={clearReset}> Clear</button>
      <DailyHrs updateTotal={addTotal} clearReset={clearReset} />

      <DailyHrList totalHr={totalHr} weekend={weekend} />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <WeekHours />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
