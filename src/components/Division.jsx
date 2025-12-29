import { useDroppable } from "@dnd-kit/core";
import UnitCard from "./UnitCard";

export default function Division({ division, units }) {
  const { setNodeRef } = useDroppable({ id: division.id });
  const assigned = units.filter(u => u.division === division.id);

  return (
    <div ref={setNodeRef} className="division">
      <h4>{division.name}</h4>
      {assigned.map(u => (
        <UnitCard key={u.id} unit={u} />
      ))}
    </div>
  );
}
