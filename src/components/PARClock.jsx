import { useEffect, useState } from "react";

export default function PARClock({ parStart, setParStart, logEvent }) {
  const [display, setDisplay] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - parStart) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const s = String(diff % 60).padStart(2, "0");
      setDisplay(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [parStart]);

  return (
    <div className="timer-box">
      <strong>PAR Clock</strong>
      <div>{display}</div>
      <button onClick={() => { logEvent("PAR Check logged"); setParStart(Date.now()); }}>Check Complete</button>
    </div>
  );
}
