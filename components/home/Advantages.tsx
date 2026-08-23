import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

const advantageIcons = [
  // Full Service
  <svg key="layers" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>,
  // Qualität
  <svg key="shield" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Zuverlässigkeit
  <svg key="clock" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>,
  // Flexibilität
  <svg key="sparkles" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>,
];

export default function Advantages() {
  return (
    <section id="vorteile" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5">
            <span className="text-sky-600 font-semibold text-sm tracking-widest uppercase">Warum HDC?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-6 leading-tight">
              Ihre Vorteile bei HDC auf einen Blick
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-base">
              Unsere Kunden vertrauen auf unsere Präzision, Zuverlässigkeit und lückenlosen Service.
              Wir garantieren Ihnen höchste Maßstäbe für Sauberkeit, Werterhalt und Objektpflege in Schweinfurt und Umgebung.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 bg-slate-900 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-sky-600 transition-colors shadow-sm"
              >
                <span>Jetzt Beratung anfordern</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a
                href={`tel:${SITE_INFO.phone}`}
                className="inline-flex items-center gap-2 bg-slate-100 text-slate-800 font-semibold px-6 py-3.5 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <span>Direkt anrufen</span>
              </a>
            </div>
          </div>

          {/* Right Grid - 4 Feature Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {SITE_INFO.advantages.map((item, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-sky-300 hover:bg-sky-50/40 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                    {advantageIcons[idx] || (
                      <span className="font-bold text-lg">0{idx + 1}</span>
                    )}
                  </div>
                  <span className="text-xs font-bold text-slate-400">0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-sky-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
