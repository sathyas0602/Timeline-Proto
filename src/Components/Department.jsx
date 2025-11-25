// src/Components/Department.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

// Base templates per department; we will inject the year into these
const BASE_TEMPLATES = [
  {
    id: "dept1",
    label: "Dept 1",
    baseTagline: "Foundations & Core Disciplines",
    baseBlurb:
      "Lays the groundwork for the institute's academic culture with core teaching and early research initiatives.",
  },
  {
    id: "dept2",
    label: "Dept 2",
    baseTagline: "Growth & Expansion",
    baseBlurb:
      "Represents a phase of rapid growth with new programs, labs, and collaborations taking shape.",
  },
  {
    id: "dept3",
    label: "Dept 3",
    baseTagline: "Innovation & Research",
    baseBlurb:
      "Focuses on pioneering research, cutting-edge projects, and breakthrough ideas across disciplines.",
  },
  {
    id: "dept4",
    label: "Dept 4",
    baseTagline: "Outreach & Impact",
    baseBlurb:
      "Connects the institute with society through outreach, industry partnerships, and community initiatives.",
  },
];

// Generate different content for each year
function getDepartmentsForYear(year) {
  if (!year) return [];

  return BASE_TEMPLATES.map((tpl, idx) => ({
    id: tpl.id,
    label: `${tpl.label}`, // keep labels same if you want
    tagline: `${tpl.baseTagline} (${year})`,
    blurb: `${tpl.baseBlurb} In ${year}, this department focused on phase ${
      idx + 1
    } of its evolution, adapting to the context and priorities of that period.`,
  }));
}

export default function Department({ selectedYear }) {
  const departments = getDepartmentsForYear(selectedYear);
  const [activeDeptId, setActiveDeptId] = useState(
    departments[0]?.id ?? null
  );

  // Reset active dept when year changes
  useEffect(() => {
    if (departments.length > 0) {
      setActiveDeptId(departments[0].id);
    } else {
      setActiveDeptId(null);
    }
  }, [selectedYear]);

  if (!selectedYear || departments.length === 0) return null;

  const activeDept =
    departments.find((d) => d.id === activeDeptId) ?? departments[0];

  return (
    <div className="w-full px-4 mt-10 flex items-center justify-center">
      <motion.div
        className="w-full max-w-5xl rounded-3xl border border-sky-500/30 bg-slate-950/80 px-6 py-7 md:px-10 md:py-9 shadow-[0_0_70px_rgba(8,47,73,0.9)] overflow-hidden relative"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* ambient glows */}
        <div className="pointer-events-none absolute -left-24 top-0 h-52 w-52 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />

        {/* Header */}
        <header className="relative mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-sky-400/80 mb-1">
              Year Snapshot
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Departments in {selectedYear}
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Interactive preview</span>
            </div>
          </div>
        </header>

        <div className="relative grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
          {/* LEFT: vertical selector + mini info */}
          <LayoutGroup>
            <div className="relative flex flex-col gap-4 border border-slate-800/80 rounded-2xl bg-slate-950/70 px-4 py-4">
              {/* year pill */}
              <div className="flex items-center justify-between mb-1">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/50 bg-sky-900/40 px-3 py-1 text-xs uppercase tracking-[0.22em] text-sky-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>{selectedYear}</span>
                </div>
                <div className="text-[0.65rem] text-slate-500">
                  Tap a dept to focus
                </div>
              </div>

              {/* vertical dept rail */}
              <div className="relative mt-1 flex gap-3">
                <div className="relative flex flex-col items-center">
                  <div className="absolute top-0 bottom-0 w-px bg-slate-700/70" />
                  {departments.map((dept, index) => {
                    const isActive = dept.id === activeDept.id;
                    return (
                      <motion.button
                        key={dept.id}
                        onClick={() => setActiveDeptId(dept.id)}
                        className="relative mb-4 last:mb-0"
                        whileHover={{ x: 2 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="dept-node-glow"
                            className="absolute -inset-2 rounded-full bg-emerald-400/30 blur-md"
                            transition={{
                              type: "spring",
                              stiffness: 320,
                              damping: 24,
                            }}
                          />
                        )}
                        <div
                          className={
                            "relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-xs font-semibold " +
                            (isActive
                              ? "border-emerald-300 bg-slate-950 text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,0.6)]"
                              : "border-slate-600 bg-slate-950 text-slate-300")
                          }
                        >
                          {index + 1}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* labels beside nodes */}
                <div className="flex flex-col justify-between py-1 text-xs md:text-sm gap-2">
                  {departments.map((dept) => {
                    const isActive = dept.id === activeDept.id;
                    return (
                      <button
                        key={dept.id}
                        onClick={() => setActiveDeptId(dept.id)}
                        className={
                          "text-left transition-colors " +
                          (isActive
                            ? "text-emerald-200"
                            : "text-slate-400 hover:text-slate-200")
                        }
                      >
                        {dept.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* tiny status chips */}
              <div className="mt-3 grid grid-cols-2 gap-2 text-[0.7rem] text-slate-400">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                  <div className="uppercase tracking-[0.2em] text-slate-500 mb-1">
                    Focus
                  </div>
                  <div className="text-slate-100 font-medium truncate">
                    {activeDept.label}
                  </div>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
                  <div className="uppercase tracking-[0.2em] text-slate-500 mb-1">
                    Mode
                  </div>
                  <div className="text-emerald-300 font-medium">Explore</div>
                </div>
              </div>
            </div>
          </LayoutGroup>

          {/* RIGHT: animated detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDept.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="relative rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950/90 via-slate-900/95 to-sky-950/80 px-5 py-5 md:px-7 md:py-6 overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-x-[-40%] -top-20 h-40 bg-gradient-to-br from-sky-500/15 via-transparent to-emerald-400/10 blur-3xl" />

              <div className="relative">
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-slate-400 mb-2">
                  {activeDept.label} • {selectedYear}
                </p>
                <h3 className="text-lg md:text-xl font-semibold text-sky-100 mb-2">
                  {activeDept.tagline}
                </h3>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-4">
                  {activeDept.blurb}
                </p>

                {/* fake stat chips */}
                <div className="mt-3 grid gap-3 md:grid-cols-3 text-[0.7rem] md:text-[0.75rem]">
                  <div className="rounded-xl border border-sky-500/40 bg-sky-950/50 px-3 py-2 flex flex-col gap-1">
                    <span className="uppercase tracking-[0.24em] text-sky-300/90">
                      Key Theme
                    </span>
                    <span className="text-slate-100">
                      Curriculum, labs, faculty strength
                    </span>
                  </div>
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/40 px-3 py-2 flex flex-col gap-1">
                    <span className="uppercase tracking-[0.24em] text-emerald-300/90">
                      Impact
                    </span>
                    <span className="text-slate-100">
                      Student intake, research output, outreach
                    </span>
                  </div>
                  <div className="rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 flex flex-col gap-1">
                    <span className="uppercase tracking-[0.24em] text-slate-400">
                      Notes
                    </span>
                    <span className="text-slate-200">
                      Replace this with {selectedYear}-specific highlights
                      later.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
