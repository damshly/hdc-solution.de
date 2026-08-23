"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_INFO } from "@/constants/site";
import { ServicesDropdown } from "./ServicesDropdown";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex items-center gap-8">
      {SITE_INFO.navLinks.map((link) => {
        const isServicesLink =
          link.href === "/leistungen" ||
          link.href === "#leistungen" ||
          link.name.toLowerCase().includes("leistungen");

        if (isServicesLink) {
          return <ServicesDropdown key={link.name} />;
        }

        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-medium transition-colors relative py-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-sky-600 after:transition-all ${isActive
                ? "text-sky-600 font-semibold after:w-full"
                : "text-slate-700 hover:text-sky-600 after:w-0 hover:after:w-full"
              }`}
          >
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
