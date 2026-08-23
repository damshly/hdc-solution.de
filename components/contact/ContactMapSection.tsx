"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

export function ContactMapSection() {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* الخريطة مع حماية الخصوصية (2-Click Solution) */}
          <div className="lg:col-span-8 h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative bg-slate-100 flex items-center justify-center">
            {isMapLoaded ? (
              <iframe
                title="HDC Gebäudedienstleistungen Standort"
                src="https://maps.google.com/maps?q=Schweinfurt%20Bayern&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
              ></iframe>
            ) : (
              <div className="text-center p-6 sm:p-8 max-w-lg space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 mx-auto flex items-center justify-center shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Interaktive Karte von Google Maps
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Aus Datenschutzgründen wird die Karte erst geladen, wenn Sie zustimmen. Dabei werden Daten an Google übermittelt.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsMapLoaded(true)}
                    className="bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    Karte jetzt laden
                  </button>
                  <a
                    href="https://maps.google.com/?q=Schweinfurt,+Bayern"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
                  >
                    In Google Maps öffnen ↗
                  </a>
                </div>
                <p className="text-[11px] text-slate-400">
                  Weitere Informationen finden Sie in unserer{" "}
                  <Link href="/datenschutz" className="underline hover:text-slate-600">
                    Datenschutzerklärung
                  </Link>.
                </p>
              </div>
            )}
          </div>

          {/* تفاصيل العنوان الجانبي بالألمانية */}
          <div className="lg:col-span-4 space-y-5 lg:pl-4">
            <div>
              <span className="text-sky-600 font-semibold text-xs uppercase tracking-widest">
                Regional vor Ort
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Standort & Einsatzgebiet
              </h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block text-xs uppercase text-sky-600">
                  Hauptregion:
                </span>
                <p className="text-slate-700 font-medium text-base">
                  {SITE_INFO.city} &amp; Landkreis
                </p>
                <p className="text-slate-500 text-xs">
                  Sowie Würzburg, Bad Kissingen, Haßberge und Unterfranken.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block text-xs uppercase text-sky-600">
                  Erreichbarkeit:
                </span>
                <p className="text-slate-700 font-medium">
                  {SITE_INFO.workingHours}
                </p>
                <a
                  href={`tel:${SITE_INFO.phone}`}
                  className="text-sky-600 hover:underline font-semibold block text-sm pt-1"
                >
                  📞 {SITE_INFO.phoneFormatted || SITE_INFO.phone}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
