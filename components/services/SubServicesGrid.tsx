import Image from "next/image";
import Link from "next/link";
import { SubService } from "@/constants/servicesData";

interface SubServicesGridProps {
  parentSlug: string;
  parentTitle: string;
  subServices: SubService[];
}

export function SubServicesGrid({ parentSlug, parentTitle, subServices }: SubServicesGridProps) {
  if (!subServices || subServices.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-sky-700 font-bold text-xs uppercase tracking-widest bg-sky-100/80 px-3 py-1 rounded-full border border-sky-200">
            Spezialbereiche
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Spezialisierte Leistungen in {parentTitle}
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2">
            Wählen Sie einen unserer maßgeschneiderten Teilbereiche für detaillierte Informationen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subServices.map((sub) => (
            <Link
              key={sub.id}
              href={`/leistungen/${parentSlug}/${sub.slug}`}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                  src={sub.image}
                  alt={sub.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-sky-600/95 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                  {sub.tag}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {sub.title}
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3">
                    {sub.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700 group-hover:text-sky-800">
                  <span>Details & Leistungen ansehen</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
