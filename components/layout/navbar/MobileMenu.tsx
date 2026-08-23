"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_INFO } from "@/constants/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
      {SITE_INFO.navLinks.map((link) => {
        const isServicesLink =
          link.href === "/leistungen" ||
          link.href === "#leistungen" ||
          link.name.toLowerCase().includes("leistungen");

        // إذا كان الرابط هو قسم الخدمات، بنعرضه وبنحط تحتو الصفحات الفرعية
        if (isServicesLink) {
          const isMainActive = pathname.startsWith("/leistungen");

          return (
            <div key={link.name} className="py-1">
              <Link
                href="/leistungen"
                onClick={onClose}
                className={`block font-bold py-2 border-b border-slate-100 ${isMainActive ? "text-sky-600" : "text-slate-900"
                  }`}
              >
                {link.name} (Übersicht)
              </Link>

              {/* القائمة الفرعية التابعة للخدمات */}
              <div className="pl-3 mt-2 space-y-1 border-l-2 border-sky-100">
                {SITE_INFO.services.map((service) => {
                  const servicePath = `/leistungen/${service.id}`;
                  const isSubActive = pathname === servicePath;

                  return (
                    <Link
                      key={service.id}
                      href={servicePath}
                      onClick={onClose}
                      className={`block text-sm py-1.5 transition-colors ${isSubActive
                          ? "text-sky-600 font-semibold"
                          : "text-slate-600 hover:text-sky-600"
                        }`}
                    >
                      {service.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        // باقي الروابط العادية بنفس ترتيب المصفوفة (Start, Über uns, Contact...)
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            onClick={onClose}
            className={`block font-medium py-2 transition-colors ${isActive ? "text-sky-600 font-semibold" : "text-slate-800 hover:text-sky-600"
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
