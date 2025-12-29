export default function IncidentLog({ log }) {
  return (
    <div className="incident-log">
      {log.map((entry, i) => (
        <div key={i}>{entry}</div>
      ))}
    </div>
  );
}
