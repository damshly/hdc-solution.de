"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_INFO } from "@/constants/site";
import { SERVICES_DATA } from "@/constants/servicesData";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({
    gebaeudereinigung: true,
  });

  if (!isOpen) return null;

  const toggleExpand = (id: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
      {SITE_INFO.navLinks.map((link) => {
        const isServicesLink =
          link.href === "/leistungen" ||
          link.href === "#leistungen" ||
          link.name.toLowerCase().includes("leistungen");

        if (isServicesLink) {
          const isMainActive = pathname.startsWith("/leistungen");

          return (
            <div key={link.name} className="py-1">
              <Link
                href="/leistungen"
                onClick={onClose}
                className={`block font-bold py-2 border-b border-slate-100 ${
                  isMainActive ? "text-sky-600" : "text-slate-900"
                }`}
              >
                {link.name} (Alle Leistungen)
              </Link>

              {/* Main Services List */}
              <div className="pl-2 mt-2 space-y-2">
                {SERVICES_DATA.map((service) => {
                  const servicePath = `/leistungen/${service.slug}`;
                  const isServiceActive = pathname === servicePath;
                  const isExpanded = expandedServices[service.id];

                  return (
                    <div key={service.id} className="bg-slate-50/70 rounded-xl p-2.5 border border-slate-100">
                      <div className="flex items-center justify-between">
                        <Link
                          href={servicePath}
                          onClick={onClose}
                          className={`text-sm font-bold transition-colors ${
                            isServiceActive ? "text-sky-600" : "text-slate-800 hover:text-sky-600"
                          }`}
                        >
                          {service.title}
                        </Link>

                        {service.subServices.length > 0 && (
                          <button
                            type="button"
                            onClick={() => toggleExpand(service.id)}
                            className="p-1 text-slate-400 hover:text-sky-600"
                            aria-label="Toggle sub-services"
                          >
                            <svg
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-sky-600" : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Sub Services */}
                      {isExpanded && service.subServices.length > 0 && (
                        <div className="mt-2 pl-3 space-y-1.5 border-l-2 border-sky-200">
                          {service.subServices.map((sub) => {
                            const subPath = `/leistungen/${service.slug}/${sub.slug}`;
                            const isSubActive = pathname === subPath;

                            return (
                              <Link
                                key={sub.id}
                                href={subPath}
                                onClick={onClose}
                                className={`block text-xs py-1 transition-colors ${
                                  isSubActive
                                    ? "text-sky-600 font-semibold"
                                    : "text-slate-600 hover:text-sky-600"
                                }`}
                              >
                                {sub.title}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClose}
            className={`block font-medium py-2 transition-colors ${
              isActive ? "text-sky-600 font-semibold" : "text-slate-800 hover:text-sky-600"
            }`}
          >
            {link.name}
          </Link>
        );
      })}

      <a
        href={`tel:${SITE_INFO.phone}`}
        className="w-full !mt-6 bg-sky-600 text-white text-center font-semibold py-3 rounded-xl flex justify-center items-center gap-2 shadow-sm active:scale-98 transition-transform"
      >
        <span>Reinigung Anfragen ({SITE_INFO.phoneFormatted})</span>
      </a>
    </div>
  );
}
