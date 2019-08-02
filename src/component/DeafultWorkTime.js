import React, { useState } from "react";
import TimeInputs from "./TimeInputs";

function DeafultWorkTime({ setDefaultTime }) {
  const [openDefaultTime, updateDefaultTime] = useState(false);
  const [defaultIn, setdefaultIn] = useState("");
  const [defaultOut, setdefaultOut] = useState("");

  const showDefaultTime = () => {
    openDefaultTime ? updateDefaultTime(false) : updateDefaultTime(true);
  };
  const tossDefaultTime = () => {
    const desiredTime = {
      in: defaultIn,
      out: defaultOut
    };
    setDefaultTime(desiredTime);
    updateDefaultTime(false);
  };

  if (openDefaultTime === true) {
    return (
      <>
        <h2> Set default hours</h2>
        <TimeInputs
          inputTitle="IN"
          timeValue={defaultIn}
          UpdateTimeValue={e => setdefaultIn(e.target.value)}
        />
        <TimeInputs
          inputTitle="OUT"
          timeValue={defaultOut}
          UpdateTimeValue={e => setdefaultOut(e.target.value)}
        />
        <button onClick={tossDefaultTime}>Accept Defaults</button>
      </>
    );
  } else {
    return <button onClick={showDefaultTime}>SET Defaults</button>;
  }
}

export default DeafultWorkTime;
