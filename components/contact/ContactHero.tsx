import Link from "next/link";

export function ContactHero() {
  return (
    <section className="relative w-full min-h-screen bg-slate-900 text-white flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/kontakt-hero-bg.jpeg')" }}
      />

      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-slate-950/70 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-20">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          Wir freuen uns auf Ihre Anfrage
        </h1>

        <p className="text-sky-400 text-lg sm:text-2xl font-medium">
          Sauberkeit mit Qualität und Vertrauen
        </p>

        <div className="pt-4">
          <Link
            href="#contact-form"
            className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 active:scale-95"
          >
            Jetzt Anfrage Senden
          </Link>
        </div>
      </div>
    </section>
  );
}
