// WHAT IF WE HAVE AND OBJECT TO GET UPDATED

function SetDefaulTime(props) {
  return (
    <div>
      d<p>Toggle for default time !!! level up tuts </p>
      <ul>
        <label>
          Lunch Time:
          <input type="number" value={props.lunch} />
        </label>
      </ul>
    </div>
  );
}

function WeekHours() {
  const [weekHrs, updateHrs] = useState([]);
  const [lunch, setLunch] = useState("0.5");
  const [standardTime, setStandardTime] = useState({
    inPunch: "08:00",
    outPunch: "16:30"
  });

  const wkDay = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat/Sun"];

  // set default start/ending time
  // NEED TO WIRE IT UP
  function resetToDefault(props) {
    newPunchIN(props.defaultTime.inPunch);
    newPunchOUT(props.defaultTime.outPunch);
  }

  function addDayHr(hr) {
    console.log("test");
    updateHrs(hr);
  }

  const HrList = weekHrs.map(x => {
    return <li>{x}</li>;
  });

  return (
    <div>
      <SetDefaulTime lunch={lunch} />
      <button onClick={resetToDefault}> RESET</button>
      <div className="weekDay">
        <DailyTime
          day={wkDay[1]}
          defaultTime={standardTime}
          weeklyTotal={addDayHr}
        />
        <h2> hours for the week </h2>
        <ul>{HrList}</ul>
      </div>
    </div>
  );
}
