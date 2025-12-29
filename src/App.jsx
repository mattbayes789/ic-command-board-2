import React, { useState, useEffect } from "react";
import UnitCard from "./components/UnitCard";
import AssignmentBox from "./components/AssignmentBox";
import CommandRoleBox from "./components/CommandRoleBox";
import MaydayBox from "./components/MaydayBox";
import IncidentTimer from "./components/IncidentTimer";
import PARClock from "./components/PARClock";
import IncidentLog from "./components/IncidentLog";
import ThemeToggle from "./components/ThemeToggle";

// Initial units
const initialUnits = [
  { id: "u1", name: "Engine 25", assignedAt: null },
  { id: "u2", name: "Truck 22", assignedAt: null },
  { id: "u3", name: "Medic 5", assignedAt: null },
  { id: "u4", name: "Squad 1", assignedAt: null },
];

const App = () => {
  const [units, setUnits] = useState(initialUnits);
  const [staging, setStaging] = useState([]);
  const [fireAttack, setFireAttack] = useState([]);
  const [search, setSearch] = useState([]);
  const [alphaCommand, setAlphaCommand] = useState([]);
  const [incidentCommand, setIncidentCommand] = useState([]);
  const [vent, setVent] = useState([]);
  const [rehab, setRehab] = useState([]);
  const [maydayActive, setMaydayActive] = useState(false);
  const [theme, setTheme] = useState("day");
  const [log, setLog] = useState([]);

  // Log helper
  const logEvent = (text) => {
    setLog((prev) => [...prev, { text, time: new Date().toLocaleTimeString() }]);
  };

  // Auto-assign all units to staging on start
  useEffect(() => {
    setStaging(units.map((u) => ({ ...u, assignedAt: Date.now() })));
  }, []);

  return (
    <div className={`app ${theme}`}>
      <header>
        <h1>IC Command Board</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button onClick={() => setMaydayActive((prev) => !prev)}>
          {maydayActive ? "End Mayday" : "Start Mayday"}
        </button>
      </header>

      {maydayActive && <MaydayBox />}

      <div className="boards">
        <div className="unit-pool">
          <h2>Unit Pool</h2>
          {staging.map((u) => (
            <UnitCard key={u.id} unit={u} />
          ))}
        </div>

        <div className="assignment-boards">
          <AssignmentBox
            id="fireAttack"
            title="Fire Attack"
            units={fireAttack}
            logEvent={logEvent}
            allowDivisions={true}
          />
          <AssignmentBox
            id="search"
            title="Search"
            units={search}
            logEvent={logEvent}
            allowDivisions={true}
          />
          <CommandRoleBox
            id="alphaCommand"
            title="Alpha Command"
            units={alphaCommand}
            logEvent={logEvent}
          />
          <CommandRoleBox
            id="incidentCommand"
            title="Incident Commander"
            units={incidentCommand}
            logEvent={logEvent}
          />
          <AssignmentBox
            id="vent"
            title="Vent"
            units={vent}
            logEvent={logEvent}
            allowDivisions={false}
          />
          <AssignmentBox
            id="rehab"
            title="Rehab"
            units={rehab}
            logEvent={logEvent}
            allowDivisions={false}
          />
        </div>
      </div>

      <div className="timers">
        <IncidentTimer logEvent={logEvent} />
        <PARClock logEvent={logEvent} />
      </div>

      <IncidentLog log={log} />
    </div>
  );
};

export default App;
