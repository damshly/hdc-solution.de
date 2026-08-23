import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | HDC Gebäudedienstleistungen",
  description: "Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten bei HDC Gebäudedienstleistungen.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <span className="text-sky-600 font-semibold text-xs uppercase tracking-widest">
            DSGVO & Privatsphäre
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Datenschutzerklärung
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Stand: {new Date().getFullYear()} – Gemäß Datenschutz-Grundverordnung (DSGVO)
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          {/* 1. Datenschutz auf einen Blick */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              1. Datenschutz auf einen Blick
            </h2>
            <h3 className="font-semibold text-slate-900 text-base">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          {/* 2. Verantwortliche Stelle */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              2. Verantwortliche Stelle
            </h2>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
              <p className="font-bold text-slate-900">{SITE_INFO.name}</p>
              <p>{SITE_INFO.fullAddress}</p>
              <p>Telefon: {SITE_INFO.phoneFormatted || SITE_INFO.phone}</p>
              <p>E-Mail: {SITE_INFO.email}</p>
            </div>
            <p>
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
            </p>
          </section>

          {/* 3. Datenerfassung auf dieser Website */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              3. Datenerfassung auf dieser Website
            </h2>
            <h3 className="font-semibold text-slate-900 text-base">Server-Log-Dateien</h3>
            <p>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Browsertyp und Browserversion</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
            </p>

            <h3 className="font-semibold text-slate-900 text-base pt-2">Kontaktaufnahme per E-Mail, Telefon oder Formular</h3>
            <p>
              Wenn Sie uns per Kontaktformular, E-Mail oder Telefon Anfragen zukommen lassen, werden Ihre Angaben inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
            </p>
          </section>

          {/* 4. Plugins und Tools */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              4. Externe Dienste & Google Maps
            </h2>
            <p>
              Auf dieser Website nutzen wir den Kartendienst Google Maps. Zur Gewährleistung des Datenschutzes ist Google Maps standardmäßig deaktiviert und wird erst geladen, wenn Sie aktiv auf &quot;Karte laden&quot; klicken (2-Klick-Lösung).
            </p>
            <p>
              Erst nach Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) stellt Ihr Browser eine direkte Verbindung zu den Servern von Google (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) her. Dabei wird mindestens Ihre IP-Adresse an Google übermittelt.
            </p>
          </section>

          {/* 5. Ihre Rechte */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              5. Ihre Rechte als betroffene Person
            </h2>
            <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO)</li>
              <li>Einschränkung der Datenverarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung Ihrer Daten (Art. 21 DSGVO)</li>
            </ul>
            <p>
              Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an die oben angegebene Adresse wenden.
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
