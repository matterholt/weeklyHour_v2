import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import TimeInputs from "./component/TimeInputs";
import DeafultWorkTime from "./component/DeafultWorkTime";
import "./styles.css";

function DailyHrs({ weeklyTotalAdd, dayName, clearHrWk }) {
  const [punchIn, updatePunchIn] = useState("0");
  const [punchOut, updatePunchOut] = useState("0");
  const [hourAccrude, setHourAccrude] = useState(0);

  function getHours(time) {
    const [hr, min] = time.split(":");
    const hrToMin = Number(hr) * 60;
    const minRound = Math.round(Number(min / 10)) * 10;
    const totalMin = hrToMin + minRound;
    return totalMin;
  }

  function clearReset() {
    clearHrWk();
    setHourAccrude();
  }

  useEffect(() => {
    const inTime = getHours(punchIn);
    const outTime = getHours(punchOut);
    const hours = (outTime - inTime) / 60;
    setHourAccrude(hours.toFixed(1));
  }, [punchIn, punchOut]);

  return (
    <div className="logs">
      <h3 class>{dayName}</h3>
      <div className="control">
        <button onClick={clearReset}> RESET </button>
      </div>
      <div className="logPunch">
        <TimeInputs
          inputTitle="Punch In:"
          timeValue={punchIn}
          UpdateTimeValue={e => updatePunchIn(e.target.value)}
        />
        <TimeInputs
          inputTitle="Punch Out:"
          timeValue={punchOut}
          UpdateTimeValue={e => updatePunchOut(e.target.value)}
        />
      </div>
      <div className="dailyHrs">
        <p>Hours:</p>
        {hourAccrude}
      </div>
    </div>
  );
}

function WeekHours() {
  const [totalHr, updateHours] = useState([]);
  const [weekend, updateWkend] = useState([]);
  const [defaultHours, updateDefaultHrs] = useState({});

  function addTotal(hr) {
    if (totalHr.length !== 5) {
      updateHours([...totalHr, hr]);
      console.log(`working ${totalHr.length + 1} this week`);
    } else if (weekend.length !== 2) {
      updateWkend([...weekend, hr]);
      console.log(`working ${weekend.length + 1} this weekend`);
    } else {
      console.log("that is a NEW week");
    }
  }
  const clearHrWk = () => {
    updateHours([]);
    updateWkend([]);
  };
  const setDefaultTime = time => {
    updateDefaultHrs(time);
  };

  return (
    <div>
      <DeafultWorkTime setDefaultTime={setDefaultTime} />
      <h1>Weekly Hours</h1>
      {totalHr}
      <DailyHrs
        dayName="Monday"
        weeklyTotalAdd={addTotal}
        clearHrWk={clearHrWk}
      />
      <DailyHrs
        dayName="Tuesday"
        weeklyTotalAdd={addTotal}
        clearHrWk={clearHrWk}
      />
    </div>
  );
}

////////////////////////////////////////////////////
function App() {
  return (
    <div className="App">
      <WeekHours />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
