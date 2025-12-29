import React from "react";
import { useDraggable } from "@dnd-kit/core";

const UnitCard = ({ unit }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: unit.id
  });

  const style = {
    border: "1px solid #333",
    padding: "0.5rem",
    margin: "0.5rem 0",
    background: "#eee",
    cursor: "grab",
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {unit.name} ({unit.timer}s)
    </div>
  );
};

export default UnitCard;
