import React from "react";
import { useDroppable } from "@dnd-kit/core";

const AssignmentBox = ({ title, units, id }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    border: "2px dashed #333",
    padding: "1rem",
    minHeight: "120px",
    background: isOver ? "#d0ffd0" : "#f8f8f8",
    marginBottom: "1rem"
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{title}</h3>
      {units.map((u) => (
        <div key={u.id}>{u.name} ({u.timer}s)</div>
      ))}
    </div>
  );
};

export default AssignmentBox;
