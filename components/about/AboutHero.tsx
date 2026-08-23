import Link from "next/link";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative bg-slate-900 text-white pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text & Button */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight">
              Sauberkeit, die Vertrauen schafft.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              HDC Dienstleistungen ist Ihr zuverlässiger Partner für professionelle Gebäudereinigung, Winterdienst, Garten- und Außenanlagenpflege sowie Objekt- und Hausverwaltung.
            </p>
            <div>
              <Link
                href="/kontakt"
                className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 active:scale-95"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>

          {/* Side Image */}
          <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-800">
            <Image
              src="/images/about-team.jpeg"
              alt="HDC Cleaning Solution"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
