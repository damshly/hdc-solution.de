import Link from "next/link";

const reasons = [
  {
    title: "Erfahrenes Team",
    desc: "Geschultes Personal mit jahrelanger Erfahrung.",
  },
  {
    title: "Moderne Reinigungstechnik",
    desc: "Einsatz effizienter und hochwertiger Arbeitsgeräte.",
  },
  {
    title: "Flexible Termine",
    desc: "Wir passen uns Ihren Abläufen an – auf Wunsch auch außerhalb der Geschäftszeiten.",
  },
  {
    title: "Faire Preise",
    desc: "Transparente Angebot ohne versteckte Kosten.",
  },
];

export function AboutWhyUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center sm:text-left">
          Warum wir?
        </h2>

        <div className="space-y-6">
          {reasons.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">{item.title}</h3>
                <p className="text-slate-600 text-sm mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/kontakt"
            className="inline-block bg-sky-400 hover:bg-sky-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            SCHREIBEN SIE UNS
          </Link>
        </div>
      </div>
    </section>
  );
}
