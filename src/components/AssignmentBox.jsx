import { useDroppable } from "@dnd-kit/core";
import UnitCard from "./UnitCard";
import Division from "./Division";

export default function AssignmentBox({
  id,
  title,
  units,
  divisions = [],
  onAddDivision,
  onRemoveDivision
}) {
  const { setNodeRef } = useDroppable({ id });
  const directUnits = units.filter(u => u.assignment === id && !u.division);

  return (
    <div ref={setNodeRef} className="box">
      <div className="box-header">
        <h3>{title}</h3>
        {onAddDivision && (
          <div className="division-controls">
            <button onClick={() => onAddDivision(id)}>➕</button>
          </div>
        )}
      </div>

      {divisions.map(div => (
        <div key={div.id}>
          <Division division={div} units={units} />
          <button className="remove-division" onClick={() => onRemoveDivision(id, div.id)}>➖ Remove</button>
        </div>
      ))}

      {directUnits.map(unit => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
