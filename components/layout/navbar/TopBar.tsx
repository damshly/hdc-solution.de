import { SITE_INFO } from "@/constants/site";

interface TopBarProps {
  scrolled: boolean;
}

export function TopBar({ scrolled }: TopBarProps) {
  return (
    <div
      className={`bg-slate-900 text-slate-300 text-xs border-b border-slate-800 transition-all duration-300 overflow-hidden ${scrolled ? "max-h-0 opacity-0 py-0 border-none" : "max-h-12 opacity-100 py-2 px-4"
        }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {SITE_INFO.workingHours}
          </span>
          <span className="hidden sm:inline-block text-slate-600">|</span>
          <span className="hidden sm:inline-block">Schweinfurt & Umgebung</span>
        </div>
        <a
          href={`tel:${SITE_INFO.phone}`}
          className="flex items-center gap-1.5 text-sky-400 font-semibold hover:text-sky-300 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>{SITE_INFO.phone}</span>
        </a>
      </div>
    </div>
  );
}
