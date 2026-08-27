"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SERVICES_DATA, MainService } from "@/constants/servicesData";

export function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMainId, setActiveMainId] = useState<string>(SERVICES_DATA[0].id);
  const pathname = usePathname();

  const isServicesActive = pathname.startsWith("/leistungen");
  const currentActiveMain = SERVICES_DATA.find((s) => s.id === activeMainId) || SERVICES_DATA[0];

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        href="/leistungen"
        className={`text-sm font-medium transition-colors py-2 flex items-center gap-1.5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-sky-600 after:transition-all ${
          isServicesActive
            ? "text-sky-600 font-semibold after:w-full"
            : "text-slate-700 hover:text-sky-600 after:w-0 hover:after:w-full"
        }`}
      >
        <span>Leistungen</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-sky-600" : isServicesActive ? "text-sky-600" : "text-slate-400"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      {/* Accordion / Tabbed Mega Dropdown */}
      {isOpen && (
        <div className="absolute top-full -left-20 w-[700px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150 flex flex-col">
          {/* Header Link to main /leistungen */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Leistungsverzeichnis
            </span>
            <Link
              href="/leistungen"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1 transition-colors"
            >
              <span>Alle Leistungen im Überblick</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-2 min-h-[300px]">
            {/* Left Column: Main Services List / Accordion */}
            <div className="col-span-5 border-r border-slate-100 pr-2 space-y-1">
              {SERVICES_DATA.map((mainService) => {
                const isCurrentHovered = mainService.id === activeMainId;
                const isPathMatch = pathname === `/leistungen/${mainService.slug}`;

                return (
                  <div
                    key={mainService.id}
                    onMouseEnter={() => setActiveMainId(mainService.id)}
                    className={`group rounded-xl p-3 cursor-pointer transition-all duration-200 flex items-center justify-between ${
                      isCurrentHovered
                        ? "bg-sky-50/80 border border-sky-100 text-sky-700 shadow-xs"
                        : "hover:bg-slate-50 text-slate-800"
                    }`}
                  >
                    <Link
                      href={`/leistungen/${mainService.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex-grow flex flex-col"
                    >
                      <span className={`text-sm font-bold ${isCurrentHovered || isPathMatch ? "text-sky-600" : "text-slate-900"}`}>
                        {mainService.title}
                      </span>
                      <span className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {mainService.subServices.length} Spezialbereiche
                      </span>
                    </Link>

                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isCurrentHovered ? "text-sky-600 translate-x-1" : "text-slate-300"
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Sub-Services List for active Main Service */}
            <div className="col-span-7 pl-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                      Hauptkategorie
                    </span>
                    <h4 className="text-sm font-extrabold text-slate-900 mt-1">
                      {currentActiveMain.title}
                    </h4>
                  </div>
                  <Link
                    href={`/leistungen/${currentActiveMain.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold text-sky-600 hover:underline flex items-center gap-0.5"
                  >
                    <span>Zur Hauptseite</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>

                <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                  {currentActiveMain.subServices.map((sub) => {
                    const subPath = `/leistungen/${currentActiveMain.slug}/${sub.slug}`;
                    const isSubActive = pathname === subPath;

                    return (
                      <Link
                        key={sub.id}
                        href={subPath}
                        onClick={() => setIsOpen(false)}
                        className={`block p-2.5 rounded-xl border transition-all duration-150 ${
                          isSubActive
                            ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                            : "bg-slate-50/70 border-slate-100 hover:border-sky-200 hover:bg-white text-slate-800 hover:shadow-xs"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold ${isSubActive ? "text-white" : "text-slate-900 hover:text-sky-600"}`}>
                            {sub.title}
                          </span>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                              isSubActive
                                ? "bg-white/20 text-white"
                                : "bg-sky-100/70 text-sky-700"
                            }`}
                          >
                            {sub.tag}
                          </span>
                        </div>
                        <p
                          className={`text-[11px] mt-1 line-clamp-2 leading-relaxed ${
                            isSubActive ? "text-sky-100" : "text-slate-500"
                          }`}
                        >
                          {sub.shortDesc}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
