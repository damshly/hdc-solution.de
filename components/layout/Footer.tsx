import Link from "next/link";
import { SITE_INFO } from "@/constants/site";

export default function Footer() {
  return (
    <footer id="kontakt" className="bg-slate-950 text-slate-300 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-sky-600 text-white font-extrabold px-3 py-1 rounded-lg text-lg">HDC</div>
              <span className="font-bold text-white text-base">Gebäudedienstleistungen</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed mb-6">
              Ihr kompetenter Partner für professionelle Gebäudereinigung und Pflegedienstleistungen in Schweinfurt &amp; Umgebung.
            </p>
            <div className="text-xs text-slate-300 font-medium">
              {SITE_INFO.workingHours}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Navigation</h3>
            <ul className="space-y-2.5">
              {SITE_INFO.navLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-300 hover:text-sky-400 transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Rechtliches */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Rechtliches</h3>
            <ul className="space-y-2.5">
              <li><Link href="/impressum" className="text-slate-300 hover:text-sky-400 transition-colors">Impressum</Link></li>
              <li><Link href="/datenschutz" className="text-slate-300 hover:text-sky-400 transition-colors">Datenschutz</Link></li>
            </ul>
          </div>

          {/* Col 4: Kontakt Info */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Kontakt</h3>
            <div className="space-y-3 text-xs">
              <p className="flex items-center gap-2">
                <span className="text-sky-400 font-medium">Telefon:</span>
                <a href={`tel:${SITE_INFO.phone}`} className="text-white hover:text-sky-300 font-semibold">
                  {SITE_INFO.phoneFormatted || SITE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sky-400 font-medium">E-Mail:</span>
                <a href={`mailto:${SITE_INFO.email}`} className="text-slate-200 hover:text-sky-300">
                  {SITE_INFO.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-sky-400 font-medium">Region:</span>
                <span className="text-slate-200">{SITE_INFO.address}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} HDC Gebäudedienstleistungen. Alle Rechte vorbehalten.</p>
          <p className="text-slate-400 font-medium">Schweinfurt &amp; Region</p>
        </div>
      </div>
    </footer>
  );
}
