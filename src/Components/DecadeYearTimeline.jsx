// src/Components/DecadeYearTimeline.jsx
import React from "react";
import { motion, LayoutGroup } from "framer-motion";

// Generate all years within the selected decade
function getYearsForDecade(decadeStart) {
  const years = [];
  for (let y = decadeStart; y < decadeStart + 10; y++) {
    years.push(y);
  }
  return years;
}

export default function DecadeYearTimeline({
  selectedDecade,
  selectedYear,
  onYearChange,
}) {
  const years = getYearsForDecade(selectedDecade);

  return (
    <div className="w-full px-4 mt-14 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Title for the decade range */}
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-10 tracking-tight">
          {selectedDecade} – {selectedDecade + 10}
        </h2>

        {/* Year timeline container */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/50 px-6 py-8 shadow-[0_0_50px_rgba(15,23,42,0.8)] overflow-hidden">
          {/* horizontal line behind year circles */}
          <div className="absolute left-[6%] right-[6%] top-1/2 h-px -translate-y-1/2 bg-slate-700/60" />

          <LayoutGroup>
            <div className="relative flex justify-between items-center gap-4">
              {years.map((year) => {
                const isActive = year === selectedYear;

                return (
                  <motion.button
                    key={year}
                    onClick={() =>
                      onYearChange(
                        isActive
                          ? null // toggle OFF if same year clicked
                          : year // select this year
                      )
                    }
                    whileHover={{ scale: 1.07, y: -3 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="relative focus:outline-none"
                  >
                    {/* glow behind selected year */}
                    {isActive && (
                      <motion.div
                        layoutId="year-glow"
                        className="absolute -inset-3 rounded-full bg-amber-400/30 blur-xl"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 25,
                        }}
                      />
                    )}

                    {/* year circle */}
                    <div
                      className={[
                        "relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-sm md:text-base font-medium",
                        isActive
                          ? "bg-slate-900 border-amber-300 text-amber-200 shadow-[0_0_18px_rgba(251,191,36,0.55)]"
                          : "bg-slate-900 border border-slate-600 text-slate-300",
                      ].join(" ")}
                    >
                      {year}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* Selected year label */}
          <motion.div
            key={selectedYear ?? "none"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-8 text-center text-slate-300 text-sm md:text-base"
          >
            {selectedYear === null ? (
              <span className="text-slate-500">
                Click a year to view department details.
              </span>
            ) : (
              <>
                Selected year:{" "}
                <span className="font-semibold text-amber-300">
                  {selectedYear}
                </span>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
