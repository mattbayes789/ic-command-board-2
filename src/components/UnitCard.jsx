import React from "react";

const UnitCard = ({ unit }) => {
  return (
    <div
      style={{
        border: "1px solid #333",
        padding: "0.5rem",
        margin: "0.5rem 0",
        background: "#eee",
        cursor: "grab"
      }}
    >
      {unit.name}
    </div>
  );
};

export default UnitCard;
