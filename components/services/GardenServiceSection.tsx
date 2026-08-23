import Image from "next/image";

export function GardenServiceSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 mb-12">
          Garten- & Außenanlagenpflege
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* العمود الأول: الوصف والمميزات */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Garten- & Außenanlagenpflege bei uns</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Eine gepflegte Außenanlage sorgt für einen gepflegten Ersten Eindruck. Wir bieten privaten und gewerblichen Kunden – wie Eigentümerwege, Firmen und Wohnanlagen – eine Pflege nach Ihren Bedürfnissen.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 text-sm mb-3">Ihre Vorteile bei HDC</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {[
                  "Regelmäßige Pflege nach Wartungsplan oder einmalige Einsätze",
                  "Flexible Chemservice nach Bedarf",
                  "Betreuung von Privat-, Gewerbe- und Wohnanlagen sowie öffentlichen Einrichtungen",
                  "Müll- und Unratbeseitigung inkl. fachgerechter Entsorgung",
                ].map((item, idx) => (
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
              src="/images/service-3.jpeg"
              alt="Gartenpflege HDC"
              fill
              className="object-cover"
            />
          </div>

          {/* العمود الثالث:تفاصيل الخدمات */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
            <div>
              <h4 className="font-bold text-sky-600 text-sm mb-2">Gartenpflege:</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Rasenmähen und Rasenkanten stutzen</li>
                <li>• Fachgerechter Unkrauteinfluss</li>
                <li>• Laubsammlung und Beseitigung der Grünabfälle</li>
                <li>• Pflege und Formschnitt von Hecken und Sträuchern</li>
              </ul>
            </div>

            <div className="border-t border-slate-200 pt-3">
              <h4 className="font-bold text-sky-600 text-sm mb-2">Außenanlagenpflege:</h4>
              <ul className="space-y-1 text-sm text-slate-600">
                <li>• Pflege von Gehwegen und Zufahrten</li>
                <li>• Reinigung von Höfen und Werksgeländen</li>
                <li>• Unkrautentfernung</li>
                <li>• Reinigung von Rinnen, Abläufen und Lichtschächten</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
