import React, { useState, useEffect } from "react";

const IncidentTimer = ({ logEvent }) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (t) => `${Math.floor(t/60)}:${t%60 < 10 ? "0"+t%60 : t%60}`;

  return (
    <div>
      <h3>Incident Timer: {formatTime(time)}</h3>
      <button onClick={() => setRunning(!running)}>{running ? "Stop" : "Start"}</button>
      <button onClick={() => { setTime(0); logEvent("Incident Timer Reset"); }}>Reset</button>
    </div>
  );
};

export default IncidentTimer;
