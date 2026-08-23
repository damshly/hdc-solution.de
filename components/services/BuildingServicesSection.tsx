import Image from "next/image";

export function BuildingServicesSection() {
  return (
    <section className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">
          Individuelle Reinigungslösungen für Gebäude
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* العمود الأول: الوصف والخدمات */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Gebäudereinigung bei uns</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Wir bieten professionelle Gebäudereinigung für Firmen- und Privatkunden. Unser Service umfasst Unterhaltsreinigung, Grundreinigung und Sonderreinigung – individuell angepasst an Ihre Wünsche und Räumlichkeiten.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-2">Unsere Reinigungsleistungen</h4>
              <ul className="space-y-1.5 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                  Grundreinigung
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                  Unterhaltsreinigung
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                  Bauendreinigung
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                  Glas- und Fensterreinigung
                </li>
              </ul>
            </div>
          </div>

          {/* العمود الثاني: الصورة */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/service-1.jpeg"
              alt="Gebäudereinigung HDC"
              fill
              className="object-cover"
            />
          </div>

          {/* العمود الثالث: نطاقات العمل (Einsatzbereiche) */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-sky-600 mb-4">Einsatzbereiche</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-sm text-slate-700">
              {[
                "Ferienwohnungen & Ferienhäuser",
                "Hotels",
                "Treppenhäuser",
                "Immobiliengesellschaften",
                "Büros & Komplexe",
                "Hausverwaltung & Verwaltungsobjekte",
                "Fitnessstudios",
                "Arztpraxen",
                "Pflegeheime",
                "Kindergärten & Schulen",
                "Einkaufszentren & Verkaufsflächen",
                "Autohäuser & Ausstellungsräume",
                "Produktions- & Lagerhallen",
                "Baustellenreinigung",
                "Sonderreinigung",
              ].map((item, idx) => (
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
