export default function Gallery() {
  const images = [
    "/images/gallery-1.jpeg",
    "/images/gallery-2.jpeg",
    "/images/gallery-3.jpeg",
    "/images/gallery-4.jpeg",
    "/images/gallery-5.jpeg",
    "/images/gallery-6.jpeg",
    "/images/gallery-7.jpeg",
    "/images/gallery-8.jpeg",
  ];

  return (
    <section id="galerie" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sky-600 font-semibold text-sm tracking-wide uppercase">Impressionen</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Das sind wir bei HDC
          </h2>
          <p className="text-slate-600">
            Bilder sagen mehr als tausend Worte – hier finden Sie einige Impressionen unserer täglichen Arbeit.
          </p>
        </div>

        {/* 8 Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-sm"
            >
              <img
                src={src}
                alt={`HDC Arbeit ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs font-semibold">HDC Service in Aktion</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
