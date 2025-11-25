// src/App.jsx
import React, { useState, useEffect } from "react";
import DecadeTimeline from "./Components/DecadeTimeline";
import DecadeYearTimeline from "./Components/DecadeYearTimeline";
import Department from "./Components/Department";

export default function App() {
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // When decade is closed, clear selectedYear too
  useEffect(() => {
    if (selectedDecade === null) {
      setSelectedYear(null);
    }
  }, [selectedDecade]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 flex flex-col items-center">
      {/* Top: decade timeline */}
      <DecadeTimeline
        selectedDecade={selectedDecade}
        setSelectedDecade={setSelectedDecade}
      />

      {/* Middle: years only AFTER a decade is clicked */}
      {selectedDecade !== null && (
        <DecadeYearTimeline
          selectedDecade={selectedDecade}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
      )}

      {/* Bottom: departments only AFTER a year is selected */}
      {selectedDecade !== null && selectedYear !== null && (
        <Department selectedYear={selectedYear} />
      )}
    </div>
  );
}
