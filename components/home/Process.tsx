import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

const steps = [
  {
    step: "01",
    title: "Unverbindliche Anfrage",
    desc: "Kontaktieren Sie uns telefonisch, per E-Mail oder über unser Formular. Wir erfassen schnell und unkompliziert Ihre Anforderungen.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Kostenlose Besichtigung & Angebot",
    desc: "Wir prüfen die Gegebenheiten vor Ort in Schweinfurt & Region und unterbreiten Ihnen ein faires, transparentes Festpreisangebot.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Pünktliche & saubere Umsetzung",
    desc: "Unser geschultes Team startet termingerecht und sorgt mit professionellem Equipment für makellose Sauberkeit und Werterhalt.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sky-400 font-semibold text-sm tracking-widest uppercase">
            Ablauf
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
            In 3 einfachen Schritten zu Ihrem sauberen Objekt
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            Unkompliziert, transparent und schnell – so einfach funktioniert die Zusammenarbeit mit HDC.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-8 flex flex-col justify-between hover:border-sky-500/50 hover:bg-slate-800/90 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-slate-600 group-hover:text-sky-400 transition-colors">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-700/40 text-xs text-sky-400 font-semibold flex items-center gap-1.5">
                <span>Schritt {idx + 1} von 3</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="mt-12 text-center">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all active:scale-95"
          >
            <span>Jetzt unverbindlich anfragen</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <span className="block mt-3 text-xs text-slate-400">
            Oder direkt anrufen: <a href={`tel:${SITE_INFO.phone}`} className="text-sky-400 hover:underline font-semibold">{SITE_INFO.phoneFormatted || SITE_INFO.phone}</a>
          </span>
        </div>
      </div>
    </section>
  );
}
