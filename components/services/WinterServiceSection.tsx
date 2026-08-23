import Image from "next/image";
import { SITE_INFO } from "@/constants/site";

export function WinterServiceSection() {
  const service = SITE_INFO.services.find((s) => s.id === "winterdienst");

  if (!service) return null;

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">
          {service.headline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* العمود الأول: الوصف والخدمات */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">{service.title} bei HDC</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {service.intro}
            </p>
            <div className="pt-2">
              <h4 className="font-bold text-slate-900 text-sm mb-2">Unsere Winterdienst-Leistungen</h4>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* العمود الثاني: الصورة */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={service.image}
              alt={`${service.title} HDC Schweinfurt`}
              fill
              className="object-cover"
            />
          </div>

          {/* العمود الثالث: المميزات */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-sky-600 mb-4">Ihre Vorteile bei HDC</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {service.benefits.map((vorteil, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{vorteil}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
