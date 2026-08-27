import Image from "next/image";
import { SITE_INFO } from "@/constants/site";

export function GardenServiceSection() {
  const service = SITE_INFO.services.find((s) => s.id === "gartenpflege");

  if (!service) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">
          {service.headline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* العمود الأول: الوصف والمميزات */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {service.title} bei HDC
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {service.intro}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-3">
                Ihre Vorteile bei HDC
              </h3>
              <ul className="space-y-2 text-sm text-slate-700">
                {service.benefits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
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

          {/* العمود الثالث: تفاصيل الخدمات */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            {service.details?.map((group, gIdx) => (
              <div
                key={gIdx}
                className={gIdx > 0 ? "border-t border-slate-200 pt-3" : ""}
              >
                <h3 className="font-bold text-sky-700 text-sm mb-2">
                  {group.title}:
                </h3>
                <ul className="space-y-1 text-sm text-slate-700">
                  {group.items.map((item, iIdx) => (
                    <li key={iIdx}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
