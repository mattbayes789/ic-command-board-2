export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button onClick={() => setTheme(t => (t === "day" ? "night" : "day"))}>
      {theme === "day" ? "Night Mode" : "Day Mode"}
    </button>
  );
}
