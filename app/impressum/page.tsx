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

const ITRK_IMPRESSUM_URL = "https://itrk.legal/1Aja.0.19xb-de.html";
const ITRK_DATENSCHUTZ_URL = "https://itrk.legal/1Aja.8V.19xb.html";

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
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

        {/* Direct Link Banner */}
        <div className="mb-8 bg-sky-50 border border-sky-200/80 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-600 text-white">
                Originalquelle
              </span>
              <span className="text-xs font-semibold text-slate-700">
                Offizielle Version (IT-Recht Kanzlei)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Sie können die vollständige und stets aktuelle Originalfassung direkt bei IT-Recht Kanzlei abrufen.
            </p>
          </div>
          <a
            href={ITRK_IMPRESSUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold transition-all shadow hover:shadow-md shrink-0 w-full sm:w-auto"
          >
            <span>Originalseite aufrufen</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
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

          {/* Stand & Copyright Footer */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
            <div>
              <a
                href="https://www.it-recht-kanzlei.de/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-medium text-slate-600"
              >
                &copy; IT-Recht Kanzlei
              </a>
            </div>
            <div>Stand: 27.08.2026, 10:45:40</div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-semibold"
          >
            <span>&larr; Zurück zur Startseite</span>
          </Link>
          <a
            href={ITRK_IMPRESSUM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-sky-600 font-medium"
          >
            <span>Direktlink zur Originalurkunde (itrk.legal)</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </main>
  );
}



