import Link from "next/link";
import Image from "next/image";
import { SITE_INFO } from "@/constants/site";

export const metadata = {
  title: "Unsere Leistungen | HDC Gebäudedienstleistungen",
  description: "Übersicht über unsere professionellen Reinigungs- und Pflegedienstleistungen in Schweinfurt.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-16">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <span className="text-sky-700 font-bold text-sm tracking-widest uppercase">
          Übersicht
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          Unsere Dienstleistungen
        </h1>
        <p className="text-slate-700 max-w-2xl mx-auto mt-3 text-base sm:text-lg">
          Wir bieten Ihnen maßgeschneiderte Lösungen für Sauberkeit, Pflege und Sicherheit Rund um Ihr Gebäude.
        </p>
      </section>

      {/* Grid of Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SITE_INFO.services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image & Tag */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-sky-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {service.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-slate-700 text-sm mt-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <Link
                  href={`/leistungen/${service.id}`}
                  className="inline-flex items-center justify-center w-full bg-slate-900 hover:bg-sky-600 text-white font-medium text-sm py-2.5 rounded-xl transition-colors duration-200 gap-2 group/btn"
                >
                  <span>Mehr erfahren</span>
                  <svg
                    className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
