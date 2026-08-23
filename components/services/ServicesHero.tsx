import Link from "next/link";

export function ServicesHero() {
  return (
    <section className="relative bg-slate-900 text-white pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40 bg-[url('/images/hero-bg.jpeg')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
        <span className="text-sky-400 font-semibold text-sm tracking-widest uppercase">
          Unsere Leistungen
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold mt-3 max-w-3xl leading-tight">
          Wir bieten Ihnen breite Angebote an Reinigungsdienstleistungen
        </h1>
        <p className="text-slate-300 text-base sm:text-lg mt-4 max-w-2xl">
          Professionelle Reinigung auf höchstem Niveau in Schweinfurt & Umgebung.
        </p>
        <div className="mt-8">
          <Link
            href="/kontakt"
            className="inline-block bg-sky-600 hover:bg-sky-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-all active:scale-95"
          >
            Kostenloses Angebot anfragen
          </Link>
        </div>
      </div>
    </section>
  );
}
