import React, { useState, useEffect } from "react";
import UnitCard from "./components/UnitCard";
import AssignmentBox from "./components/AssignmentBox";

const initialUnits = [
  { id: "u1", name: "Engine 25" },
  { id: "u2", name: "Truck 22" },
  { id: "u3", name: "Medic 5" },
  { id: "u4", name: "Squad 1" },
];

const App = () => {
  const [staging, setStaging] = useState([]);
  const [fireAttack, setFireAttack] = useState([]);

  useEffect(() => {
    setStaging(initialUnits);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>IC Command Board</h1>

      <div style={{ display: "flex", gap: "2rem", marginTop: "1rem" }}>
        <div>
          <h2>Staging</h2>
          {staging.map(u => (
            <UnitCard key={u.id} unit={u} />
          ))}
        </div>

        <AssignmentBox title="Fire Attack" units={fireAttack} />
      </div>
    </div>
  );
};

export default App;
