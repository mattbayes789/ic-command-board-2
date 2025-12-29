import React, { useState, useEffect } from "react";

const PARClock = ({ logEvent }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => `${Math.floor(t/60)}:${t%60 < 10 ? "0"+t%60 : t%60}`;

  const checkComplete = () => {
    logEvent("PAR Check Complete");
    setTime(0);
  };

  return (
    <div>
      <h3>PAR Clock: {formatTime(time)}</h3>
      <button onClick={checkComplete}>Check Complete</button>
    </div>
  );
};

export default PARClock;
