import React from "react";

const ThemeToggle = ({ theme, setTheme }) => (
  <button onClick={() => setTheme(theme === "day" ? "night" : "day")}>
    {theme === "day" ? "Switch to Night" : "Switch to Day"}
  </button>
);

export default ThemeToggle;
