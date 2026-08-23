"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_INFO } from "@/constants/site";

export function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // فحص ما إذا كانت الصفحة الحالية هي صفحة الخدمات أو أحد فروعها
  const isActive = pathname.startsWith("/leistungen");

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/leistungen"
        className={`text-sm font-medium transition-colors py-2 flex items-center gap-1.5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-sky-600 after:transition-all ${isActive
            ? "text-sky-600 font-semibold after:w-full"
            : "text-slate-700 hover:text-sky-600 after:w-0 hover:after:w-full"
          }`}
      >
        <span>Leistungen</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-sky-600" : isActive ? "text-sky-600" : "text-slate-400"
            }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link
            href="/leistungen"
            className={`block px-4 py-2 text-xs font-bold uppercase tracking-wider border-b border-slate-100 ${pathname === "/leistungen" ? "text-sky-600 bg-sky-50/50" : "text-sky-600 hover:bg-slate-50"
              }`}
          >
            Alle Leistungen
          </Link>
          {SITE_INFO.services.map((service) => {
            const servicePath = `/leistungen/${service.id}`;
            const isSubActive = pathname === servicePath;

            return (
              <Link
                key={service.id}
                href={servicePath}
                className={`block px-4 py-2.5 text-sm transition-colors ${isSubActive
                    ? "text-sky-600 font-semibold bg-sky-50/60"
                    : "text-slate-700 hover:text-sky-600 hover:bg-slate-50"
                  }`}
              >
                {service.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
