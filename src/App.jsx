import React, { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
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
  { id: "u1", name: "Engine 25", assignedTo: "staging", timer: 0 },
  { id: "u2", name: "Truck 22", assignedTo: "staging", timer: 0 },
  { id: "u3", name: "Medic 5", assignedTo: "staging", timer: 0 },
  { id: "u4", name: "Squad 1", assignedTo: "staging", timer: 0 }
];

const App = () => {
  const [units, setUnits] = useState(initialUnits);
  const [maydayActive, setMaydayActive] = useState(false);
  const [theme, setTheme] = useState("day");
  const [log, setLog] = useState([]);

  // Helper: log event
  const logEvent = (text) => {
    setLog((prev) => [...prev, { text, time: new Date().toLocaleTimeString() }]);
  };

  // Auto-increment per-unit timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setUnits((prev) =>
        prev.map((u) =>
          u.assignedTo !== null ? { ...u, timer: u.timer + 1 } : u
        )
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Drag & Drop handler
  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const unitId = active.id;
    const targetId = over.id;
    const unit = units.find((u) => u.id === unitId);
    if (!unit) return;

    // Update assignments with rules
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id === unitId) return { ...u, assignedTo: targetId, timer: 0 };
        // Single-unit boxes replacement logic
        if ((targetId === "alphaCommand" || targetId === "incidentCommand") && u.assignedTo === targetId) {
          logEvent(`${u.name} replaced by ${unit.name} in ${targetId}`);
          return { ...u, assignedTo: "staging", timer: 0 };
        }
        return u;
      })
    );

    logEvent(`${unit.name} assigned to ${targetId}`);
  };

  // Get units per box
  const getUnitsByBox = (box) => units.filter((u) => u.assignedTo === box);

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

      <DndContext onDragEnd={handleDragEnd}>
        <div className="boards">
          <div className="unit-pool">
            <h2>Unit Pool</h2>
            {getUnitsByBox("staging").map((u) => (
              <UnitCard key={u.id} unit={u} id={u.id} />
            ))}
          </div>

          <div className="assignment-boards">
            <AssignmentBox title="Fire Attack" id="fireAttack" units={getUnitsByBox("fireAttack")} />
            <AssignmentBox title="Search" id="search" units={getUnitsByBox("search")} />
            <CommandRoleBox title="Alpha Command" id="alphaCommand" units={getUnitsByBox("alphaCommand")} />
            <CommandRoleBox title="Incident Commander" id="incidentCommand" units={getUnitsByBox("incidentCommand")} />
            <AssignmentBox title="Vent" id="vent" units={getUnitsByBox("vent")} />
            <AssignmentBox title="Rehab" id="rehab" units={getUnitsByBox("rehab")} />
          </div>
        </div>
      </DndContext>

      <div className="timers">
        <IncidentTimer logEvent={logEvent} />
        <PARClock logEvent={logEvent} />
      </div>

      <IncidentLog log={log} />
    </div>
  );
};

export default App;
