import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

export default function CtaBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-sky-950 text-white relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sky-500/10 border border-sky-400/30 rounded-full px-4 py-1.5 text-sky-300 text-xs font-semibold mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>Kostenlose & unverbindliche Beratung</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Bereit für ein sauberes und gepflegtes Objekt?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-light">
            Ob Unterhaltsreinigung, Außenpflege oder Notfall-Winterdienst in Schweinfurt & Umgebung:
            Wir erstellen Ihnen innerhalb kürzester Zeit ein individuelles Festpreisangebot.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 text-center transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Angebot anfordern</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <a
              href={`tel:${SITE_INFO.phone}`}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl backdrop-blur-sm border border-white/15 text-center transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{SITE_INFO.phoneFormatted || SITE_INFO.phone}</span>
            </a>
          </div>

          {/* Quick trust metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-10 border-t border-slate-800 text-center">
            <div>
              <div className="text-2xl font-bold text-sky-400">100%</div>
              <div className="text-xs text-slate-300 mt-1">Zuverlässigkeit</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-sky-400">24/7</div>
              <div className="text-xs text-slate-300 mt-1">Notdienst erreichbar</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-sky-400">0 €</div>
              <div className="text-xs text-slate-300 mt-1">Kostenlose Besichtigung</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-sky-400">Regional</div>
              <div className="text-xs text-slate-300 mt-1">Schweinfurt & Umland</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
