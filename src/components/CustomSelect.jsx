import { useState, useRef, useEffect } from "react";

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label className="text-sm text-white/60">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-left text-white flex justify-between items-center"
      >
        <span>{value || "Select"}</span>
        <span className="opacity-50">▾</span>
      </button>

      {open && (
        <div className="absolute z-20 w-full bg-neutral-900 border border-white/10 rounded-md mt-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-white/10 transition ${
                value === option ? "bg-white/10" : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
