import Link from "next/link";

export function ContactHero() {
  return (
    <section className="relative w-full bg-slate-900 text-white flex items-center justify-center overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: "url('/images/kontakt-hero-bg.jpeg')" }}
      />

      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-900/60 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
        <span className="text-sky-400 font-semibold text-xs uppercase tracking-widest bg-sky-950/70 border border-sky-800/60 px-3.5 py-1.5 rounded-full inline-block">
          Unverbindlich &amp; Schnell
        </span>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
          Wir freuen uns auf Ihre Anfrage
        </h1>

        <p className="text-slate-300 text-base sm:text-xl font-light max-w-2xl mx-auto">
          Professionelle Gebäudedienstleistungen in Schweinfurt &amp; Umgebung. Wir erstellen Ihnen ein maßgeschneidertes Festpreisangebot.
        </p>

        <div className="pt-2">
          <Link
            href="#contact-form"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 active:scale-95 text-sm sm:text-base"
          >
            <span>Jetzt Angebot anfragen</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
