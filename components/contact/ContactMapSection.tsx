export function ContactMapSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* الخريطة */}
          <div className="lg:col-span-8 h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <iframe
              title="HDC Location"
              src="https://maps.google.com/maps?q=Ziegelstra%C3%9Fe%2036,%2023556%20L%C3%BCbeck&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>

          {/* تفاصيل العنوان الجانبي */}
          <div className="lg:col-span-4 space-y-4 lg:pl-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Visit Us
            </h2>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-lg">Address:</h3>
              <p className="text-slate-600 text-base leading-relaxed">
                Ziegelstraße 36, 23556 Lübeck
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
