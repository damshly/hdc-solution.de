import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

export const metadata: Metadata = {
  title: "Impressum | HDC Gebäudedienstleistungen",
  description: "Gesetzliche Anbieterkennzeichnung und rechtliche Hinweise von HDC Gebäudedienstleistungen in Schweinfurt.",
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
          {/* Angaben */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Angaben zum Unternehmen
            </h2>
            <p className="font-semibold text-slate-900">{SITE_INFO.name}</p>
            <p>Inhaber / Geschäftsführung: HDC Gebäudedienstleistungen</p>
            <p>Einsatzgebiet: {SITE_INFO.fullAddress}</p>
          </section>

          {/* Kontakt */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Kontakt
            </h2>
            <p>
              <span className="font-medium text-slate-900">Telefon: </span>
              <a href={`tel:${SITE_INFO.phone}`} className="text-sky-600 hover:underline">
                {SITE_INFO.phoneFormatted || SITE_INFO.phone}
              </a>
            </p>
            <p>
              <span className="font-medium text-slate-900">E-Mail: </span>
              <a href={`mailto:${SITE_INFO.email}`} className="text-sky-600 hover:underline">
                {SITE_INFO.email}
              </a>
            </p>
            <p>
              <span className="font-medium text-slate-900">Website: </span>
              <a href={SITE_INFO.url} className="text-sky-600 hover:underline">
                {SITE_INFO.url}
              </a>
            </p>
          </section>

          {/* Verantwortlich für den Inhalt */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p>{SITE_INFO.name}</p>
            <p>{SITE_INFO.address}</p>
          </section>

          {/* EU-Streitschlichtung */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              EU-Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline break-all"
              >
                https://ec.europa.eu/consumers/odr
              </a>
              .
            </p>
            <p>
              Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          {/* Haftung für Inhalte */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Haftung für Inhalte
            </h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
            </p>
            <p>
              Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
          </section>

          {/* Haftung für Links */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          {/* Urheberrecht */}
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
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
