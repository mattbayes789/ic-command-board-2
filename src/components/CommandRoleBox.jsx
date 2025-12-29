import { useDroppable } from "@dnd-kit/core";
import UnitCard from "./UnitCard";

export default function CommandRoleBox({ id, title, units }) {
  const { setNodeRef } = useDroppable({ id });
  const current = units.find(u => u.assignment === id);

  return (
    <div ref={setNodeRef} className="box command">
      <h3>{title}</h3>
      {current && <UnitCard unit={current} />}
    </div>
  );
}
