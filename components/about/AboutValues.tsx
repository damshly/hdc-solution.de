const values = [
  {
    title: "Zuverlässigkeit",
    desc: "Wir halten Termine ein und liefern stets beständige Ergebnisse.",
    icon: (
      <svg className="w-6 h-6 text-sky-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 0a1.5 1.5 0 00-3 0v2.5m3-2.5a1.5 1.5 0 013 0m0 0v9a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 003 0V11a1.5 1.5 0 00-3 0" />
      </svg>
    ),
  },
  {
    title: "Qualität",
    desc: "Jede Leistung wird mit Sorgfalt und hohem Qualitätsstandard durchgeführt.",
    icon: (
      <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Nachhaltigkeit",
    desc: "Wir setzen auf umweltschonende Produkte und moderne Verfahren.",
    icon: (
      <svg className="w-6 h-6 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    title: "Kundenorientierung",
    desc: "Ihre Zufriedenheit steht für uns an erster Stelle.",
    icon: (
      <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export function AboutValues() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Unsere Werte</h2>
          <p className="text-slate-600 text-sm mt-2">
            Diese Grundsätze begleiten uns bei jedem Auftrag.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center text-center space-y-3"
            >
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                {val.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{val.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
