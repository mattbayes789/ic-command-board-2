import React from "react";

const AssignmentBox = ({ title, units }) => {
  return (
    <div
      style={{
        border: "2px dashed #333",
        padding: "1rem",
        minHeight: "100px",
        background: "#f8f8f8"
      }}
    >
      <h3>{title}</h3>
      {units.map(u => (
        <div key={u.id}>{u.name}</div>
      ))}
    </div>
  );
};

export default AssignmentBox;
