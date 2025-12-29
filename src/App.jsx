import React, { useState, useEffect } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { initialUnits } from "./data/initialUnits";
import UnitCard from "./components/UnitCard";
import AssignmentBox from "./components/AssignmentBox";
import CommandRoleBox from "./components/CommandRoleBox";
import MaydayBox from "./components/MaydayBox";
import IncidentTimer from "./components/IncidentTimer";
import PARClock from "./components/PARClock";
import IncidentLog from "./components/IncidentLog";
import ThemeToggle from "./components/ThemeToggle";
import "./styles.css";

const App = () => {
  const [units, setUnits] = useState([]);
  const [mayday, setMayday] = useState(false);
  const [theme, setTheme] = useState("day");
  const [incidentLog, setIncidentLog] = useState([]);
  const [incidentResetFlag, setIncidentResetFlag] = useState(false);

  // Assignment boxes
  const assignmentBoxes = ["staging", "fireAttack", "search", "rehab", "vent"];
  const commandBoxes = ["incidentCommand", "alphaCommand"];

  // Load units from localStorage or default
  useEffect(() => {
    const savedUnits = JSON.parse(localStorage.getItem("units"));
    if (savedUnits) setUnits(savedUnits);
    else setUnits(initialUnits);
  }, []);

  // Persist units
  useEffect(() => {
    localStorage.setItem("units", JSON.stringify(units));
  }, [units]);

  // Handle drag and drop
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    setUnits((prev) => {
      const newUnits = [...prev];
      const unitIndex = newUnits.findIndex((u) => u.id === active.id);
      if (unitIndex === -1) return newUnits;
      const target = over.id;

      // Command roles only accept 1 unit
      if (commandBoxes.includes(target)) {
        const existing = newUnits.find((u) => u.assignment === target);
        if (existing) {
          // Transfer log
          logEvent(`${existing.name} replaced by ${newUnits[unitIndex].name} in ${target}`);
          existing.assignment = "staging";
          existing.assignedAt = Date.now();
        }
        newUnits[unitIndex].assignment = target;
        newUnits[unitIndex].assignedAt = Date.now();
        return newUnits;
      }

      // Assignment boxes accept multiple units
      newUnits[unitIndex].assignment = target;
      newUnits[unitIndex].assignedAt = Date.now();
      return newUnits;
    });
  };

  const logEvent = (text) => {
    setIncidentLog((prev) => [...prev, { text, time: new Date().toLocaleTimeString() }]);
  };

  // Mayday toggle
  const toggleMayday = () => setMayday((prev) => !prev);

  // Reset incident (clears everything)
  const resetIncident = () => {
    const resetUnits = units.map((u) => ({ ...u, assignment: "pool", assignedAt: null }));
    setUnits(resetUnits);
    setIncidentLog([]);
    setIncidentResetFlag(true);
    setMayday(false);
  };

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>IC Command Board</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <button onClick={toggleMayday}>{mayday ? "End Mayday" : "Start Mayday"}</button>
        <button onClick={resetIncident}>Incident Reset</button>
      </header>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="board">
          {/* Unit Pool */}
          <AssignmentBox
            id="pool"
            title="Unit Pool"
            units={units.filter((u) => u.assignment === "pool")}
            logEvent={logEvent}
          />

          {/* Staging */}
          <AssignmentBox
            id="staging"
            title="Staging"
            units={units.filter((u) => u.assignment === "staging")}
            logEvent={logEvent}
          />

          {/* Fire Attack */}
          <AssignmentBox
            id="fireAttack"
            title="Fire Attack"
            units={units.filter((u) => u.assignment === "fireAttack")}
            logEvent={logEvent}
            allowDivisions={true}
          />

          {/* Search */}
          <AssignmentBox
            id="search"
            title="Search"
            units={units.filter((u) => u.assignment === "search")}
            logEvent={logEvent}
            allowDivisions={true}
          />

          {/* Rehab */}
          <AssignmentBox
            id="rehab"
            title="Rehab"
            units={units.filter((u) => u.assignment === "rehab")}
            logEvent={logEvent}
          />

          {/* Vent */}
          <AssignmentBox
            id="vent"
            title="Vent"
            units={units.filter((u) => u.assignment === "vent")}
            logEvent={logEvent}
          />

          {/* Command roles */}
          {commandBoxes.map((id) => (
            <CommandRoleBox
              key={id}
              id={id}
              title={id === "incidentCommand" ? "Incident Command" : "Alpha Command"}
              units={units.filter((u) => u.assignment === id)}
              logEvent={logEvent}
            />
          ))}

          {/* Mayday Box */}
          {mayday && <MaydayBox />}
        </div>
      </DndContext>

      {/* Timers */}
      <IncidentTimer key={incidentResetFlag} logEvent={logEvent} />
      <PARClock logEvent={logEvent} />

      {/* Incident Log */}
      <IncidentLog log={incidentLog} />
    </div>
  );
};

export default App;
