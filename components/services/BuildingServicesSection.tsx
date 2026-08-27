import Image from "next/image";
import { SITE_INFO } from "@/constants/site";

export function BuildingServicesSection() {
  const service = SITE_INFO.services.find((s) => s.id === "gebaeudereinigung");

  if (!service) return null;

  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">
          {service.headline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* العمود الأول: الوصف والخدمات */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title} bei HDC</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {service.intro}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Unsere Reinigungsleistungen</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {service.features.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                    <span>{item}</span>
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
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          {/* العمود الثالث: نطاقات العمل (Einsatzbereiche) */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-sky-700 mb-4">Einsatzbereiche</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm text-slate-700">
              {service.areas?.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-sky-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
