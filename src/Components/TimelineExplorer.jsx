import React, { useState, useMemo } from "react";

const DECADES = [
  {
    id: "1959-68",
    label: "1959–68",
    title: "1959–68: A Decade of Growth",
    icon: "📖",
    years: [
      {
        year: 1959,
        departments: [
          {
            id: "aero",
            name: "Aerospace Engineering",
            description:
              "1959 – Aerospace Engineering laid the foundation for aeronautical research and flight technologies.",
          },
        ],
      },
      {
        year: 1961,
        departments: [
          {
            id: "civil",
            name: "Civil Engineering",
            description:
              "1961 – Civil Engineering expanded into structural design, transportation, and public infrastructure.",
          },
        ],
      },
      {
        year: 1965,
        departments: [
          {
            id: "metal",
            name: "Metallurgy",
            description:
              "1965 – Metallurgy focused on metal processing, materials development, and alloy characterization.",
          },
        ],
      },
      {
        year: 1968,
        departments: [
          {
            id: "humanities",
            name: "Humanities",
            description:
              "1968 – Humanities strengthened the institute’s focus on ethics, culture, and social sciences.",
          },
        ],
      },
    ],
  },
  {
    id: "1969-78",
    label: "1969–78",
    title: "1969–78: Expansion & Innovation",
    icon: "🎓",
    years: [
      {
        year: 1970,
        departments: [
          {
            id: "cs",
            name: "Computer Science",
            description:
              "1970 – Computer Science emerged with courses in algorithms, systems, and early programming languages.",
          },
        ],
      },
      {
        year: 1975,
        departments: [
          {
            id: "elec",
            name: "Electrical Engineering",
            description:
              "1975 – Electrical Engineering broadened into power systems, electronics, and communication.",
          },
        ],
      },
    ],
  },
  {
    id: "1979-88",
    label: "1979–88",
    title: "1979–88: Towards Excellence",
    icon: "📜",
    years: [
      {
        year: 1980,
        departments: [
          {
            id: "mech",
            name: "Mechanical Engineering",
            description:
              "1980 – Mechanical Engineering strengthened its focus on design, manufacturing, and thermal systems.",
          },
        ],
      },
      {
        year: 1985,
        departments: [
          {
            id: "chem",
            name: "Chemical Engineering",
            description:
              "1985 – Chemical Engineering advanced in process control, reaction engineering, and plant design.",
          },
        ],
      },
    ],
  },
  {
    id: "1989-98",
    label: "1989–98",
    title: "1989–98: Global Outreach",
    icon: "🎖️",
    years: [
      {
        year: 1990,
        departments: [
          {
            id: "it",
            name: "Information Technology",
            description:
              "1990 – Information Technology emerged with networking, databases, and enterprise systems.",
          },
        ],
      },
      {
        year: 1995,
        departments: [
          {
            id: "mgmt",
            name: "Management Studies",
            description:
              "1995 – Management Studies focused on leadership, operations, and strategic management.",
          },
        ],
      },
    ],
  },
  {
    id: "1999-08",
    label: "1999–08",
    title: "1999–08: New Frontiers",
    icon: "🌐",
    years: [
      {
        year: 2000,
        departments: [
          {
            id: "ai",
            name: "Artificial Intelligence",
            description:
              "2000 – AI and intelligent systems were introduced with machine learning and robotics.",
          },
        ],
      },
      {
        year: 2005,
        departments: [
          {
            id: "bio",
            name: "Biotechnology",
            description:
              "2005 – Biotechnology integrated life sciences with engineering for healthcare and agriculture.",
          },
        ],
      },
    ],
  },
];

export default function TimelineExplorer() {
  const [selectedDecadeId, setSelectedDecadeId] = useState(DECADES[0].id);
  const selectedDecade = useMemo(
    () => DECADES.find((d) => d.id === selectedDecadeId) ?? DECADES[0],
    [selectedDecadeId]
  );

  const [selectedYear, setSelectedYear] = useState(
    selectedDecade.years[0]?.year
  );

  const activeYear =
    selectedDecade.years.find((y) => y.year === selectedYear) ??
    selectedDecade.years[0];

  const [selectedDeptId, setSelectedDeptId] = useState(
    activeYear?.departments[0]?.id
  );

  const activeDept =
    activeYear?.departments.find((d) => d.id === selectedDeptId) ??
    activeYear?.departments[0];

  // Whenever decade or year changes, keep things in sync
  React.useEffect(() => {
    if (!selectedDecade.years.some((y) => y.year === selectedYear)) {
      setSelectedYear(selectedDecade.years[0]?.year);
    }
  }, [selectedDecade, selectedYear]);

  React.useEffect(() => {
    if (!activeYear) return;
    if (!activeYear.departments.some((d) => d.id === selectedDeptId)) {
      setSelectedDeptId(activeYear.departments[0]?.id);
    }
  }, [activeYear, selectedDeptId]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 text-sky-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl">
        {/* Top title */}
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Milestones of the Institute
          </h1>
        </header>

        {/* Decade timeline (like first slide) */}
        <section className="mb-14">
          <div className="relative pb-10">
            {/* Horizontal line */}
            <div className="pointer-events-none absolute left-[6%] right-[6%] top-10 h-px bg-cyan-400/60" />
            <div className="flex justify-between items-start gap-4">
              {DECADES.map((decade) => {
                const active = decade.id === selectedDecadeId;
                return (
                  <button
                    key={decade.id}
                    onClick={() => setSelectedDecadeId(decade.id)}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div
                      className={[
                        "flex items-center justify-center rounded-full border-2 w-20 h-20 md:w-24 md:h-24 text-3xl md:text-4xl transition-all duration-200",
                        active
                          ? "border-amber-400 bg-sky-900/70 shadow-[0_0_40px_rgba(251,191,36,0.7)]"
                          : "border-cyan-400 bg-sky-900/40 group-hover:border-amber-300",
                      ].join(" ")}
                    >
                      <span>{decade.icon}</span>
                    </div>
                    <span className="text-sm md:text-base tracking-wide">
                      {decade.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Decade detail view (like second/third slide) */}
        <section className="rounded-3xl bg-sky-900/20 border border-cyan-400/40 px-6 py-10 md:px-10 md:py-12 backdrop-blur-sm">
          {/* Decade heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-10">
            {selectedDecade.title}
          </h2>

          {/* Year timeline */}
          <div className="relative mb-12">
            <div className="pointer-events-none absolute left-[8%] right-[8%] top-8 h-px bg-cyan-300/60" />
            <div className="flex justify-between items-start gap-4">
              {selectedDecade.years.map((y) => {
                const active = y.year === activeYear.year;
                return (
                  <button
                    key={y.year}
                    onClick={() => setSelectedYear(y.year)}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div
                      className={[
                        "flex items-center justify-center rounded-full border-2 w-16 h-16 md:w-20 md:h-20 text-lg md:text-xl transition-all duration-200",
                        active
                          ? "border-amber-300 bg-sky-900/80 shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                          : "border-cyan-300 bg-sky-900/40 group-hover:border-amber-200",
                      ].join(" ")}
                    >
                      {y.year}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vertical connector from years to departments */}
          <div className="flex flex-col items-center mb-6">
            <div className="h-10 w-px bg-cyan-300/70" />
          </div>

          {/* Departments and descriptions for selected year */}
          <div className="flex flex-wrap justify-center gap-10">
            {activeYear.departments.map((dept) => {
              const active = dept.id === activeDept?.id;
              return (
                <div
                  key={dept.id}
                  className="flex flex-col items-center max-w-xs"
                >
                  <button
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={[
                      "flex items-center justify-center rounded-full border-2 w-20 h-20 md:w-24 md:h-24 text-xs md:text-sm font-medium text-center leading-snug transition-all duration-200",
                      active
                        ? "border-amber-300 bg-sky-900/80 text-amber-100 shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                        : "border-cyan-300 bg-sky-900/50 text-cyan-100 hover:border-amber-200 hover:text-amber-100",
                    ].join(" ")}
                  >
                    {dept.name}
                  </button>

                  <div className="mt-4 w-full rounded-xl bg-sky-900/60 border border-cyan-300/40 px-4 py-3 text-sm leading-relaxed text-sky-50">
                    {dept.description}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
