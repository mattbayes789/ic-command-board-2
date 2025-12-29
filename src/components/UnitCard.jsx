import React, { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const UnitCard = ({ unit }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: unit.id
  });

  const [timeAssigned, setTimeAssigned] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (unit.assignedAt) {
        setTimeAssigned(Math.floor((Date.now() - unit.assignedAt) / 1000));
      } else setTimeAssigned(0);
    }, 1000);
    return () => clearInterval(interval);
  }, [unit.assignedAt]);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="unit-card"
      style={{
        transform: transform
          ? `translate3d(${transform.x}px,${transform.y}px,0)`
          : undefined
      }}
    >
      <strong>{unit.name}</strong>
      {unit.assignedAt && <div>Time: {timeAssigned}s</div>}
    </div>
  );
};

export default UnitCard;
