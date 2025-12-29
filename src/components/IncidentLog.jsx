import React from "react";

const IncidentLog = ({ log }) => (
  <div style={{ marginTop: "1rem", borderTop: "2px solid #333", paddingTop: "1rem" }}>
    <h3>Incident Log</h3>
    {log.map((entry, i) => (
      <div key={i}>{entry.time}: {entry.text}</div>
    ))}
  </div>
);

export default IncidentLog;
