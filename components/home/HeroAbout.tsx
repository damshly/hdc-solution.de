import { SITE_INFO } from "@/constants/site";
import Image from "next/image";

export default function About() {
  return (
    <section id="uber-uns" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative min-h-[320px] lg:min-h-full">
            <Image
              fill
              priority
              src="/images/about-team.jpeg" // صورة العمل في الصفحة الحالية
              alt="Über HDC Team"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/20"></div>
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center text-white">
            <span className="text-sky-400 font-semibold text-sm tracking-wide uppercase mb-2">Über Uns</span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Über HDC-Team</h2>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sky-300 font-semibold text-lg">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                Junges Team
              </div>
              <div className="flex items-center gap-3 text-sky-300 font-semibold text-lg">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                Große Leidenschaft
              </div>
              <div className="flex items-center gap-3 text-sky-300 font-semibold text-lg">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                Zuverlässiger Service
              </div>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-8">
              Wir sind ein dynamisches und motiviertes Team in Schweinfurt. Gebäudereinigung ist unsere Leidenschaft,
              und mit unserer jahrelangen Erfahrung garantieren wir Ihnen Sauberkeit und Werterhalt für Ihr Objekt.
            </p>

            <div>
              <a
                href={`tel:${SITE_INFO.phone}`}
                className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all"
              >
                <span>Direkt Kontakt aufnehmen</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
