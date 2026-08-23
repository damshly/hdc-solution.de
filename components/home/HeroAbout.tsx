import { SITE_INFO } from "@/constants/site";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <section id="uber-uns" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[320px] lg:min-h-[440px]">
            <Image
              fill
              src="/images/about-team.jpeg"
              alt="HDC Team Gebäudedienstleistungen Schweinfurt"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-slate-950/25" />
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-white">
            <span className="text-sky-400 font-semibold text-sm tracking-widest uppercase mb-2">
              Über Uns
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-white leading-tight">
              Ihr verlässliches HDC-Team vor Ort
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sky-300 font-medium text-base sm:text-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />
                <span>Junges, dynamisches & geschultes Team</span>
              </div>
              <div className="flex items-center gap-3 text-sky-300 font-medium text-base sm:text-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />
                <span>Leidenschaft für Sauberkeit, Werterhalt & Hygiene</span>
              </div>
              <div className="flex items-center gap-3 text-sky-300 font-medium text-base sm:text-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />
                <span>24/7 Zuverlässigkeit & persönlicher Ansprechpartner</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-8">
              Wir sind ein motiviertes Team in Schweinfurt. Gebäudedienstleistung ist unsere Leidenschaft:
              Mit moderner Ausrüstung, geschulten Fachkräften und lückenloser Qualitätskontrolle garantieren wir Ihnen Sauberkeit und Werterhalt für Ihr Gebäude.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/uber-hdc"
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95"
              >
                <span>Mehr über uns erfahren</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <a
                href={`tel:${SITE_INFO.phone}`}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3 rounded-xl border border-white/15 transition-all"
              >
                <span>Direkt anrufen</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
