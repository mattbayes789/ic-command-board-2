import { useEffect, useState } from "react";

export default function IncidentTimer({ incidentStart, setIncidentStart, logEvent }) {
  const [running, setRunning] = useState(true);
  const [display, setDisplay] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!running) return;
      const diff = Math.floor((Date.now() - incidentStart) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const s = String(diff % 60).padStart(2, "0");
      setDisplay(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [incidentStart, running]);

  return (
    <div className="timer-box">
      <strong>Incident</strong>
      <div>{display}</div>
      <button onClick={() => setRunning(r => !r)}>{running ? "Stop" : "Start"}</button>
      <button onClick={() => { setIncidentStart(Date.now()); logEvent("Incident clock reset"); }}>Reset</button>
    </div>
  );
}
