import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

export const metadata: Metadata = {
  title: `Impressum | ${SITE_INFO.name}`,
  description: `Gesetzliche Anbieterkennzeichnung und rechtliche Hinweise von ${SITE_INFO.name}.`,
  robots: {
    index: false,
    follow: true,
  },
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-sky-600 font-semibold text-xs uppercase tracking-widest">
            Rechtliche Hinweise
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Impressum
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* Angaben zum Unternehmen */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Angaben zum Unternehmen
            </h2>
            <p className="font-bold text-slate-900 text-lg">{SITE_INFO.name}</p>
            <p className="font-semibold text-slate-800">Inhaber: {SITE_INFO.owner}</p>
            <p className="text-slate-600">
              {SITE_INFO.street}<br />
              {SITE_INFO.zip} {SITE_INFO.city}<br />
              {SITE_INFO.country}
            </p>
          </section>

          {/* Kontakt */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Kontakt
            </h2>
            <p>
              <span className="font-medium text-slate-900">Telefon: </span>
              <a href={`tel:${SITE_INFO.phone}`} className="text-sky-600 hover:underline">
                {SITE_INFO.phoneFormatted}
              </a>
            </p>
            <p>
              <span className="font-medium text-slate-900">E-Mail: </span>
              <a href={`mailto:${SITE_INFO.email}`} className="text-sky-600 hover:underline">
                {SITE_INFO.email}
              </a>
            </p>
          </section>

          {/* Umsatzsteuer-ID */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Umsatzsteuer-ID
            </h2>
            <p>
              <span className="font-medium text-slate-900">Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: </span>
              <span className="font-semibold text-slate-800">{SITE_INFO.taxId}</span>
            </p>
          </section>

          {/* Verbraucherstreitbeilegung */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <p>
              Wir sind zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle weder verpflichtet noch bereit.
            </p>
          </section>

          {/* Stand */}
          <div className="pt-4 border-t border-slate-100 text-slate-400 text-xs">
            Stand: 27.08.2026, 10:45:40
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold text-sm"
          >
            <span>← Zurück zur Startseite</span>
          </Link>
        </div>
      </div>
    </main>
  );
}


