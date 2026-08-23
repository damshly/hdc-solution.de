import Image from "next/image";

export function WinterServiceSection() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">
          Unser Dienst im Winter 24/7
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* العمود الأول: الوصف */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Winterdienst bei uns</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Zuverlässiger 24/7 Winterdienst für private und gewerbliche Kunden – damit Wege, Parkplätze und Zufahrten auch bei Schnee und Eis sicher bleiben.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Wir sorgen nicht nur für Räumung, sondern auch für fachgerechtes Streuen. Gehwege, Parkplätze, Treppen, Eingangsbereiche, Zufahrten, Straßen, Höfe und Werksgelände werden zuverlässig winterfest gemacht.
            </p>
          </div>

          {/* العمود الثاني: الصورة */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/service-2.jpeg"
              alt="Winterdienst HDC"
              fill
              className="object-cover"
            />
          </div>

          {/* العمود الثالث: المميزات */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-sky-600 mb-4">Ihre Vorteile bei HDC</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {[
                "24/7 Einsatzbereitschaft",
                "Schnelle Schneeräumung und Enteisung",
                "Fachgerechtes Aufbringen des Streuguts nach Satzungen",
                "Zuverlässige Betreuung auch bei extremen Wetterlagen",
                "Für private und gewerbliche Kunden jeder Größe",
              ].map((vortag, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{vortag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
