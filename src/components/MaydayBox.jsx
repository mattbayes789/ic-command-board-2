import UnitCard from "./UnitCard";
import { useDroppable } from "@dnd-kit/core";

export default function MaydayBox({ units }) {
  const { setNodeRef } = useDroppable({ id: "mayday" });
  const assigned = units.filter(u => u.assignment === "mayday");

  return (
    <div ref={setNodeRef} className="box mayday">
      <h3>MAYDAY</h3>
      {assigned.map(u => (
        <UnitCard key={u.id} unit={u} />
      ))}
    </div>
  );
}
