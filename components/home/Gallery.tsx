import Image from "next/image";

export default function Gallery() {
  const images = [
    { src: "/images/gallery-1.jpeg", title: "Gebäudereinigung & Glanz", subtitle: "Büro- & Praxisräume" },
    { src: "/images/gallery-2.jpeg", title: "Unterhaltsreinigung", subtitle: "Gewerbeobjekte" },
    { src: "/images/gallery-3.jpeg", title: "Glas- & Fensterreinigung", subtitle: "Streifenfreier Durchblick" },
    { src: "/images/gallery-4.jpeg", title: "Winterdienst Einsatz", subtitle: "24/7 Schneeräumung" },
    { src: "/images/gallery-5.jpeg", title: "Außenanlagen & Garten", subtitle: "Gepflegte Grünflächen" },
    { src: "/images/gallery-6.jpeg", title: "Treppenhausreinigung", subtitle: "Mehrfamilienhäuser" },
    { src: "/images/gallery-7.jpeg", title: "Hygienereinigung", subtitle: "Präzise Desinfektion" },
    { src: "/images/gallery-8.jpeg", title: "Objektbetreuung", subtitle: "Werterhalt & Schutz" },
  ];

  return (
    <section id="galerie" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sky-600 font-semibold text-sm tracking-widest uppercase">Impressionen</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            Das sind wir bei HDC
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Bilder sagen mehr als tausend Worte – hier finden Sie Einblicke in unsere tägliche Qualitätsarbeit vor Ort in Schweinfurt & Region.
          </p>
        </div>

        {/* 8 Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {images.map((item, index) => (
            <div
              key={index}
              className="group relative h-60 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/70 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Image
                src={item.src}
                alt={`HDC Gebäudedienstleistung - ${item.title}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-white text-xs sm:text-sm font-bold">{item.title}</span>
                <span className="text-sky-300 text-[11px] font-medium">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
