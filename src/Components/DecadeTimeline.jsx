import React from "react";
import { motion, LayoutGroup } from "framer-motion";

// MUI Icons
import HistoryIcon from "@mui/icons-material/History";
import SchoolIcon from "@mui/icons-material/School";
import ScienceIcon from "@mui/icons-material/Science";
import PublicIcon from "@mui/icons-material/Public";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const DECADES = [
  { year: 1960, icon: <HistoryIcon fontSize="large" /> },
  { year: 1970, icon: <SchoolIcon fontSize="large" /> },
  { year: 1980, icon: <ScienceIcon fontSize="large" /> },
  { year: 1990, icon: <PublicIcon fontSize="large" /> },
  { year: 2000, icon: <AutoAwesomeIcon fontSize="large" /> },
];

export default function DecadeTimeline({ selectedDecade, setSelectedDecade }) {
  return (
    <div className="w-full px-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <h1 className="text-center text-3xl md:text-4xl font-semibold mb-10 tracking-tight">
          Milestones Timeline
        </h1>

        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-8 shadow-[0_0_60px_rgba(15,23,42,0.9)] overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-fuchsia-500/5" />

          <div className="relative">
            <div className="absolute left-[7%] right-[7%] top-1/2 h-px -translate-y-1/2 bg-slate-700/70" />

            <LayoutGroup>
              <div className="relative flex items-center justify-between gap-4">
                {DECADES.map((d) => {
                  const isActive = d.year === selectedDecade;

                  return (
                    <motion.button
                      key={d.year}
                      onClick={() =>
                        setSelectedDecade(
                          d.year === selectedDecade ? null : d.year
                        )
                      }
                      className="relative flex flex-col items-center gap-2 focus:outline-none"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                        {isActive && (
                          <motion.div
                            layoutId="decade-glow"
                            className="absolute -inset-2 rounded-full bg-cyan-400/30 blur-md"
                            transition={{
                              type: "spring",
                              stiffness: 350,
                              damping: 25,
                            }}
                          />
                        )}

                        <div
                          className={[
                            "relative z-10 flex items-center justify-center w-full h-full rounded-full border bg-slate-900/90 text-cyan-200",
                            isActive
                              ? "border-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.7)]"
                              : "border-slate-600 text-slate-300",
                          ].join(" ")}
                        >
                          {d.icon}
                        </div>
                      </div>

                      <span
                        className={
                          "text-sm md:text-base tracking-wide " +
                          (isActive ? "text-cyan-200" : "text-slate-300")
                        }
                      >
                        {d.year}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          {selectedDecade === null ? (
            <div className="mt-8 text-center text-sm md:text-base text-slate-400">
              Click a decade to view the years within it.
            </div>
          ) : (
            <motion.div
              key={selectedDecade}
              className="mt-8 text-center text-sm md:text-base text-slate-300"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              Selected decade:{" "}
              <span className="font-semibold text-cyan-300">
                {selectedDecade}s
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
