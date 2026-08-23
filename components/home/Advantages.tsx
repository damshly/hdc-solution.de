import { SITE_INFO } from "@/constants/site";

export default function Advantages() {
  return (
    <section id="vorteile" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5">
            <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">Warum HDC?</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-6 leading-tight">
              Ihre Vorteile bei HDC auf einen Blick
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              Unsere Kunden vertrauen auf unsere Präzision, Zuverlässigkeit und lückenlosen Service.
              Wir garantieren Ihnen höchste Maßstäbe für Sauberkeit und Objektpflege.
            </p>
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="inline-flex items-center gap-2 bg-slate-900 text-white font-medium px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              <span>Jetzt Beratung anfordern</span>
            </a>
          </div>

          {/* Right Grid - 4 Feature Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {SITE_INFO.advantages.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-sky-200 hover:bg-sky-50/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold text-lg mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
