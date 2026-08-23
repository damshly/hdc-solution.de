import Image from "next/image";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

export default function Services() {
  return (
    <section id="leistungen" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sky-600 font-semibold text-sm tracking-widest uppercase">
            Gebäudedienstleistung
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            Unsere Kernkompetenzen
          </h2>
          <p className="text-slate-600 leading-relaxed text-base">
            Professionelle, zuverlässige und flexible Dienstleistungen für Firmen-, Gewerbe- und Privatobjekte in Schweinfurt & Umgebung.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {SITE_INFO.services.map((service, index) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={service.image || `/images/service-${index + 1}.jpeg`}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-[left_top] group-hover:scale-105 transition-transform duration-500" />

                <span className="absolute top-3 right-3 z-10 bg-slate-900/85 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {service.tag}
                </span>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-sky-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <Link
                    href={`/leistungen/${service.id}`}
                    className="w-full bg-slate-900 hover:bg-sky-600 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Details ansehen</span>
                    <svg
                      className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services Link */}
        <div className="mt-12 text-center">
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline"
          >
            <span>Alle Leistungen und Leistungsbereiche im Detail ansehen</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
