import type { Metadata } from "next";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

export const metadata: Metadata = {
  title: `Datenschutzerklärung | ${SITE_INFO.name}`,
  description: `Informationen zum Datenschutz und zur Verarbeitung personenbezogener Daten bei ${SITE_INFO.name}.`,
  robots: {
    index: false,
    follow: true,
  },
};

const ITRK_DATENSCHUTZ_URL = "https://itrk.legal/1Aja.8V.19xb.html";
const ITRK_IMPRESSUM_URL = "https://itrk.legal/1Aja.0.19xb-de.html";

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <span className="text-sky-600 font-semibold text-xs uppercase tracking-widest">
            Rechtliche Hinweise &amp; DSGVO
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
            Datenschutzerklärung
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Rechtstext erstellt und bereitgestellt über IT-Recht Kanzlei
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
            href={ITRK_DATENSCHUTZ_URL}
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
          {/* Header Info Line */}
          <div className="text-xs text-slate-500 pb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <span>
              Basil Al Juma &middot; HDC Cleaning Solution &middot; Ziegelstraße 36 &middot; 23556 Lübeck &middot; Deutschland &middot; Tel.: 015560888113 &middot; E-Mail: info@hdc-solution.de
            </span>
            <Link
              href="/impressum"
              className="text-sky-600 hover:underline font-semibold"
            >
              Impressum
            </Link>
          </div>

          {/* 1. Einleitung und Kontaktdaten des Verantwortlichen */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              1) Einleitung und Kontaktdaten des Verantwortlichen
            </h2>
            <p>
              <strong>1.1</strong>&nbsp;Wir freuen uns, dass Sie unsere Website besuchen, und bedanken uns für Ihr Interesse. Im Folgenden informieren wir Sie über den Umgang mit Ihren personenbezogenen Daten bei der Nutzung unserer Website. Personenbezogene Daten sind hierbei alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
            <p>
              <strong>1.2</strong>&nbsp;Verantwortlicher für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist Basil Al Juma, HDC Cleaning Solution, Ziegelstraße 36, 23556 Lübeck, Deutschland, Tel.: 015560888113, E-Mail: info@hdc-solution.de. Der für die Verarbeitung von personenbezogenen Daten Verantwortliche ist diejenige natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
            </p>
          </section>

          {/* 2. Datenerfassung beim Besuch unserer Website */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              2) Datenerfassung beim Besuch unserer Website
            </h2>
            <p>
              Bei der bloß informatorischen Nutzung unserer Website, also wenn Sie sich nicht registrieren oder uns anderweitig Informationen übermitteln, erheben wir nur solche Daten, die Ihr Browser an den Seitenserver übermittelt (sog. „Server-Logfiles“). Wenn Sie unsere Website aufrufen, erheben wir die folgenden Daten, die für uns technisch erforderlich sind, um Ihnen die Website anzuzeigen:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Unsere besuchte Website</li>
              <li>Datum und Uhrzeit zum Zeitpunkt des Zugriffes</li>
              <li>Menge der gesendeten Daten in Byte</li>
              <li>Quelle/Verweis, von welchem Sie auf die Seite gelangten</li>
              <li>Verwendeter Browser</li>
              <li>Verwendetes Betriebssystem</li>
              <li>Verwendete IP-Adresse (ggf.: in anonymisierter Form)</li>
            </ul>
            <p>
              Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der Verbesserung der Stabilität und Funktionalität unserer Website. Eine Weitergabe oder anderweitige Verwendung der Daten findet nicht statt. Wir behalten uns allerdings vor, die Server-Logfiles nachträglich zu überprüfen, sollten konkrete Anhaltspunkte auf eine rechtswidrige Nutzung hinweisen.
            </p>
          </section>

          {/* 3. Kontaktaufnahme */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              3) Kontaktaufnahme
            </h2>
            
            <p>
              <strong>3.1</strong>&nbsp;WhatsApp-Business
            </p>
            <p>
              Sie haben die Möglichkeit, mit uns über den Nachrichtendienst WhatsApp der WhatsApp Ireland Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland, in Kontakt zu treten. Hierfür verwenden wir die sog. „Business-Version“ von WhatsApp.
            </p>
            <p>
              Sofern Sie uns anlässlich eines konkreten Geschäfts (beispielsweise einer getätigten Bestellung) per WhatsApp kontaktieren, speichern und verwenden wir die von Ihnen bei WhatsApp genutzte Mobilfunknummer sowie – falls bereitgestellt – Ihren Vor- und Nachnamen gemäß Art. 6 Abs. 1 lit. b. DSGVO zur Bearbeitung und Beantwortung Ihres Anliegens. Auf Basis derselben Rechtsgrundlage werden wir Sie per WhatsApp gegebenenfalls um die Bereitstellung weiterer Daten (Bestellnummer, Kundennummer, Anschrift oder E-Mailadresse) bitten, um Ihre Anfrage einem bestimmten Vorgang zuordnen zu können.
            </p>
            <p>
              Nutzen Sie unseren WhatsApp-Kontakt für allgemeine Anfragen (etwa zum Leistungsspektrum, zu Verfügbarkeiten oder zu unserem Internetauftritt) speichern und verwenden wir die von Ihnen bei WhatsApp genutzte Mobilfunknummer sowie – falls bereitgestellt – Ihren Vor- und Nachnamen gemäß Art. 6 Abs. 1 lit. f DSGVO auf Basis unseres berechtigten Interesses an der effizienten und zeitnahen Bereitstellung der gewünschten Informationen.
            </p>
            <p>
              Ihre Daten werden stets nur zur Beantwortung Ihres Anliegens per WhatsApp verwendet. Eine Weitergabe an Dritte findet nicht statt.
            </p>
            <p>
              Bitte beachten Sie, dass WhatsApp Business Zugriff auf das Adressbuch des von uns hierfür verwendeten mobilen Endgeräts erhält und im Adressbuch gespeicherte Telefonnummern automatisch an einen Server des Mutterkonzerns Meta Platforms Inc. in den USA überträgt. Für den Betrieb unseres WhatsApp-Business-Kontos verwenden wir ein mobiles Endgerät, in dessen Adressbuch ausschließlich die WhatsApp-Kontaktdaten solcher Nutzer gespeichert werden, die mit uns per WhatsApp auch in Kontakt getreten sind.
            </p>
            <p>
              Hierdurch wird sichergestellt, dass jede Person, deren WhatsApp- Kontaktdaten in unserem Adressbuch gespeichert sind, bereits bei erstmaliger Nutzung der App auf seinem Gerät durch Akzeptanz der WhatsApp-Nutzungsbedingungen in die Übermittlung seiner WhatsApp-Telefonnummer aus den Adressbüchern seiner Chat-Kontakte gemäß Art. 6 Abs. 1 lit. a DSGVO eingewilligt hat. Eine Übermittlung von Daten solcher Nutzer, die WhatsApp nicht verwenden und/oder uns nicht über WhatsApp kontaktiert haben, wird insofern ausgeschlossen.
            </p>
            <p>
              Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch WhatsApp sowie Ihre diesbezüglichen Rechte und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre entnehmen Sie bitte den Datenschutzhinweisen von WhatsApp:{" "}
              <a
                href="https://www.whatsapp.com/legal/?eea=1#privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline break-all"
              >
                https://www.whatsapp.com/legal/?eea=1#privacy-policy
              </a>
            </p>
            <p>
              Wir haben mit dem Anbieter einen Auftragsverarbeitungsvertrag geschlossen, der die Daten unserer Seitenbesucher schützt und eine Weitergabe an Dritte untersagt.
            </p>
            <p>
              Im Rahmen der oben genannten Verarbeitungen kann es zu Datenübertragungen an Server von Meta Platforms Inc. in den USA kommen.
            </p>
            <p>
              Für Datenübermittlungen in die USA hat sich der Anbieter dem EU-US-Datenschutzrahmen (EU-US Data Privacy Framework) angeschlossen, das auf Basis eines Angemessenheitsbeschlusses der Europäischen Kommission die Einhaltung des europäischen Datenschutzniveaus sicherstellt.
            </p>

            <p>
              <strong>3.2</strong>&nbsp;Im Rahmen der Kontaktaufnahme mit uns (z.B. per Kontaktformular oder E-Mail) werden personenbezogene Daten erhoben. Welche Daten im Falle der Nutzung eines Kontaktformulars erhoben werden, ist aus dem jeweiligen Kontaktformular ersichtlich. Diese Daten werden ausschließlich zum Zweck der Beantwortung Ihres Anliegens bzw. für die Kontaktaufnahme und die damit verbundene technische Administration gespeichert und verwendet.
            </p>
            <p>
              Rechtsgrundlage für die Verarbeitung dieser Daten ist unser berechtigtes Interesse an der Beantwortung Ihres Anliegens gemäß Art. 6 Abs. 1 lit. f DSGVO. Zielt Ihre Kontaktierung auf den Abschluss eines Vertrages ab, so ist zusätzliche Rechtsgrundlage für die Verarbeitung Art. 6 Abs. 1 lit. b DSGVO. Ihre Daten werden nach abschließender Bearbeitung Ihrer Anfrage gelöscht. Dies ist der Fall, wenn sich aus den Umständen entnehmen lässt, dass der betroffene Sachverhalt abschließend geklärt ist und sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          {/* 4. Rechte des Betroffenen */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              4) Rechte des Betroffenen
            </h2>
            <p>
              <strong>4.1</strong>&nbsp;Das geltende Datenschutzrecht gewährt Ihnen gegenüber dem Verantwortlichen hinsichtlich der Verarbeitung Ihrer personenbezogenen Daten die nachstehenden Betroffenenrechte (Auskunfts- und Interventionsrechte), wobei für die jeweiligen Ausübungsvoraussetzungen auf die angeführte Rechtsgrundlage verwiesen wird:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Auskunftsrecht gemäß Art. 15 DSGVO;</li>
              <li>Recht auf Berichtigung gemäß Art. 16 DSGVO;</li>
              <li>Recht auf Löschung gemäß Art. 17 DSGVO;</li>
              <li>Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO;</li>
              <li>Recht auf Unterrichtung gemäß Art. 19 DSGVO;</li>
              <li>Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO;</li>
              <li>Recht auf Widerruf erteilter Einwilligungen gemäß Art. 7 Abs. 3 DSGVO;</li>
              <li>Recht auf Beschwerde gemäß Art. 77 DSGVO.</li>
            </ul>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3 mt-4 text-slate-800">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                <strong>4.2</strong>&nbsp;WIDERSPRUCHSRECHT
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed">
                WENN WIR IM RAHMEN EINER INTERESSENABWÄGUNG IHRE PERSONENBEZOGENEN DATEN AUFGRUND UNSERES ÜBERWIEGENDEN BERECHTIGTEN INTERESSES VERARBEITEN, HABEN SIE DAS JEDERZEITIGE RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIESE VERARBEITUNG WIDERSPRUCH MIT WIRKUNG FÜR DIE ZUKUNFT EINZULEGEN.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">
                MACHEN SIE VON IHREM WIDERSPRUCHSRECHT GEBRAUCH, BEENDEN WIR DIE VERARBEITUNG DER BETROFFENEN DATEN. EINE WEITERVERARBEITUNG BLEIBT ABER VORBEHALTEN, WENN WIR ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN KÖNNEN, DIE IHRE INTERESSEN, GRUNDRECHTE UND GRUNDFREIHEITEN ÜBERWIEGEN, ODER WENN DIE VERARBEITUNG DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN DIENT.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">
                WERDEN IHRE PERSONENBEZOGENEN DATEN VON UNS VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN. SIE KÖNNEN DEN WIDERSPRUCH WIE OBEN BESCHRIEBEN AUSÜBEN.
              </p>
              <p className="text-xs sm:text-sm leading-relaxed">
                MACHEN SIE VON IHREM WIDERSPRUCHSRECHT GEBRAUCH, BEENDEN WIR DIE VERARBEITUNG DER BETROFFENEN DATEN ZU DIREKTWERBEZWECKEN.
              </p>
            </div>
          </section>

          {/* 5. Dauer der Speicherung personenbezogener Daten */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-2">
              5) Dauer der Speicherung personenbezogener Daten
            </h2>
            <p>
              Die Dauer der Speicherung von personenbezogenen Daten bemisst sich anhand der jeweiligen Rechtsgrundlage, am Verarbeitungszweck und – sofern einschlägig – zusätzlich anhand der jeweiligen gesetzlichen Aufbewahrungsfrist (z.B. handels- und steuerrechtliche Aufbewahrungsfristen).
            </p>
            <p>
              Bei der Verarbeitung von personenbezogenen Daten auf Grundlage einer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO werden die betroffenen Daten so lange gespeichert, bis Sie Ihre Einwilligung widerrufen.
            </p>
            <p>
              Existieren gesetzliche Aufbewahrungsfristen für Daten, die im Rahmen rechtsgeschäftlicher bzw. rechtsgeschäftsähnlicher Verpflichtungen auf der Grundlage von Art. 6 Abs. 1 lit. b DSGVO verarbeitet werden, werden diese Daten nach Ablauf der Aufbewahrungsfristen routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind und/oder unsererseits kein berechtigtes Interesse an der Weiterspeicherung fortbesteht.
            </p>
            <p>
              Bei der Verarbeitung von personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO werden diese Daten so lange gespeichert, bis Sie Ihr Widerspruchsrecht nach Art. 21 Abs. 1 DSGVO ausüben, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
            </p>
            <p>
              Bei der Verarbeitung von personenbezogenen Daten zum Zwecke der Direktwerbung auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO werden diese Daten so lange gespeichert, bis Sie Ihr Widerspruchsrecht nach Art. 21 Abs. 2 DSGVO ausüben.
            </p>
            <p>
              Sofern sich aus den sonstigen Informationen dieser Erklärung über spezifische Verarbeitungssituationen nichts anderes ergibt, werden gespeicherte personenbezogene Daten im Übrigen dann gelöscht, wenn sie für die Zwecke, für die sie erhoben oder auf sonstige Weise verarbeitet wurden, nicht mehr notwendig sind.
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
            <div>Stand: 29.08.2026, 13:15:49</div>
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
            href={ITRK_DATENSCHUTZ_URL}
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



