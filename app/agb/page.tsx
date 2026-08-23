import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

export const metadata: Metadata = {
  title: "AGB | HDC Gebäudedienstleistungen",
  description: "Allgemeine Geschäftsbedingungen für Dienstleistungen von HDC Gebäudedienstleistungen in Schweinfurt.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AgbPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-sky-600 font-semibold text-xs uppercase tracking-widest">
            Vertragsbedingungen
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Gültig für alle Dienstleistungen von {SITE_INFO.name}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              § 1 Geltungsbereich & Allgemeines
            </h2>
            <p>
              (1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge, Angebote und Dienstleistungen zwischen {SITE_INFO.name} (nachfolgend &quot;Auftragnehmer&quot;) und ihren Auftraggebern für die Bereiche Gebäudereinigung, Winterdienst, Garten- und Außenanlagenpflege sowie damit verbundene Dienstleistungen.
            </p>
            <p>
              (2) Abweichende, entgegenstehende oder ergänzende Bedingungen des Auftraggebers werden nur dann Vertragsbestandteil, wenn ihrer Geltung ausdrücklich schriftlich zugestimmt wurde.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              § 2 Vertragsschluss & Angebote
            </h2>
            <p>
              (1) Alle Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht ausdrücklich als verbindlich gekennzeichnet sind.
            </p>
            <p>
              (2) Ein Vertrag kommt durch die schriftliche Auftragsbestätigung, die Unterzeichnung eines Dienstleistungsvertrages oder durch die tatsächliche Aufnahme der Arbeiten zustande.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              § 3 Leistungsumfang & Ausführung
            </h2>
            <p>
              (1) Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Angebot bzw. Leistungsverzeichnis.
            </p>
            <p>
              (2) Der Auftragnehmer verpflichtet sich, die übertragenen Arbeiten fachgerecht, pünktlich und unter Einsatz geeigneter Arbeitsmittel und qualifizierten Personals auszuführen.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              § 4 Vergütung & Zahlungsbedingungen
            </h2>
            <p>
              (1) Die Vergütung richtet sich nach den im Angebot bzw. Vertrag vereinbarten Preisen zzgl. der jeweils geltenden gesetzlichen Mehrwertsteuer.
            </p>
            <p>
              (2) Rechnungen sind, sofern nicht anders vereinbart, innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug zur Zahlung fällig.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              § 5 Haftung & Versicherung
            </h2>
            <p>
              (1) Der Auftragnehmer verfügt über eine ausreichende Betriebshaftpflichtversicherung für Personen-, Sach- und Vermögensschäden.
            </p>
            <p>
              (2) Für Schäden, die nachweislich auf vorsätzliches oder grob fahrlässiges Verhalten des Personals zurückzuführen sind, haftet der Auftragnehmer im Rahmen der gesetzlichen Bestimmungen und der Deckungssummen der Betriebshaftpflichtversicherung.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              § 6 Schlussbestimmungen
            </h2>
            <p>
              (1) Es gilt das Recht der Bundesrepublik Deutschland. Erfüllungsort und Gerichtsstand ist, soweit gesetzlich zulässig, Schweinfurt.
            </p>
            <p>
              (2) Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
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
