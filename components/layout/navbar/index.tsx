"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";
import { TopBar } from "./TopBar";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname?.startsWith("/admin-secret-dashboard")) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <TopBar scrolled={scrolled} />

      <nav
        className={`transition-all duration-300 ${scrolled
          ? "bg-white/90 backdrop-blur-md shadow-lg shadow-slate-900/5 py-3"
          : "bg-white/80 backdrop-blur-sm py-4 border-b border-slate-100"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group select-none">
            {/* Logo Container with Smooth Scale & Soft Shadow */}
            <div className="relative p-1.5 rounded-xl bg-white group-hover:shadow-md group-hover:-translate-y-0.5 transition-all duration-300 ease-in-out">
              <Image
                src="/logo.png"
                alt="HDC Logo"
                width={48}
                height={48}
                className="object-contain w-auto h-9 sm:h-10 transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>

            {/* Text Brand Info */}
            <div className="flex flex-col justify-center">
              <span className="font-extrabold text-slate-900 text-base sm:text-lg leading-tight tracking-tight group-hover:text-sky-600 transition-colors duration-200">
                Gebäudedienstleistungen
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-sky-600 tracking-wider uppercase">
                Schweinfurt
              </span>
            </div>
          </Link>
          <NavLinks />

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="bg-gradient-to-r from-sky-600 to-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-sky-600/25 active:scale-95 transition-all duration-200 flex items-center gap-2"
            >
              <span>Jetzt anrufen</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Toggle Mobile Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Menu Toggle"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      </nav>
    </header>
  );
}
