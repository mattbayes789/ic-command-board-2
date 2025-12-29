import React from "react";
import { useDroppable } from "@dnd-kit/core";

const CommandRoleBox = ({ title, units, id }) => {
  const { isOver, setNodeRef } = useDroppable({ id });

  const style = {
    border: "2px solid #333",
    padding: "1rem",
    minHeight: "60px",
    background: isOver ? "#ffd0d0" : "#f8f8f8",
    marginBottom: "1rem"
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{title}</h3>
      {units.length > 0 ? (
        <div>{units[0].name} ({units[0].timer}s)</div>
      ) : (
        <div>Empty</div>
      )}
    </div>
  );
};

export default CommandRoleBox;
