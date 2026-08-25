"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type ConsentState = "accepted" | "rejected" | null;

const COOKIE_CONSENT_KEY = "hdc_cookie_consent";

export default function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentState | null;
    if (!stored) {
      // Slight delay for better UX – don't flash on first paint
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
    setConsent(stored);
  }, []);

  const handleDecision = (decision: "accepted" | "rejected") => {
    setAnimateOut(true);
    setTimeout(() => {
      localStorage.setItem(COOKIE_CONSENT_KEY, decision);
      setConsent(decision);
      setVisible(false);
      setAnimateOut(false);
    }, 400);
  };

  if (!visible || consent !== null) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[998] transition-opacity duration-400 ${
          animateOut ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden="true"
      />

      {/* Banner */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
        aria-describedby="cookie-banner-desc"
        className={`
          fixed bottom-0 left-0 right-0 z-[999]
          sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md
          transition-all duration-400 ease-in-out
          ${animateOut
            ? "opacity-0 translate-y-6"
            : "opacity-100 translate-y-0"
          }
        `}
      >
        <div className="
          bg-white border border-slate-200 shadow-2xl shadow-slate-900/20
          rounded-t-2xl sm:rounded-2xl
          p-6 sm:p-7
          flex flex-col gap-5
        ">
          {/* Header */}
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 bg-sky-50 border border-sky-100 rounded-xl flex items-center justify-center text-xl">
              🍪
            </div>
            <div>
              <h2
                id="cookie-banner-title"
                className="text-slate-900 font-bold text-base leading-snug"
              >
                Wir verwenden Cookies
              </h2>
              <p className="text-sky-600 text-xs font-medium mt-0.5">
                DSGVO-konform · Datenschutz
              </p>
            </div>
          </div>

          {/* Description */}
          <p
            id="cookie-banner-desc"
            className="text-slate-600 text-sm leading-relaxed"
          >
            Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung
            zu bieten. Einige sind technisch notwendig, andere helfen uns, die
            Website zu verbessern.
          </p>

          {/* Privacy link */}
          <div className="text-xs text-slate-400">
            Mehr erfahren in unserer{" "}
            <Link
              href="/datenschutz"
              className="text-sky-600 hover:text-sky-700 font-semibold underline underline-offset-2 transition-colors"
            >
              Datenschutzerklärung
            </Link>
            .
          </div>

          {/* Cookie types */}
          <div className="flex flex-col gap-2 bg-slate-50 rounded-xl p-3.5 border border-slate-100">
            <CookieType
              icon="🔒"
              label="Notwendige Cookies"
              description="Immer aktiv – für Grundfunktionen erforderlich"
              forced
            />
            <div className="border-t border-slate-200/70 my-0.5" />
            <CookieType
              icon="📊"
              label="Analyse-Cookies"
              description="Helfen uns, die Nutzung zu verstehen"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              id="cookie-accept-btn"
              onClick={() => handleDecision("accepted")}
              className="
                flex-1 bg-sky-600 hover:bg-sky-700 active:scale-[0.98]
                text-white font-semibold text-sm
                px-5 py-3 rounded-xl
                transition-all duration-150
                shadow-sm shadow-sky-600/30
                cursor-pointer
              "
            >
              Alle akzeptieren
            </button>
            <button
              id="cookie-reject-btn"
              onClick={() => handleDecision("rejected")}
              className="
                flex-1 bg-slate-100 hover:bg-slate-200 active:scale-[0.98]
                text-slate-700 font-semibold text-sm
                px-5 py-3 rounded-xl
                transition-all duration-150
                cursor-pointer
              "
            >
              Nur notwendige
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─── Helper sub-component ─────────────────────────── */
function CookieType({
  icon,
  label,
  description,
  forced = false,
}: {
  icon: string;
  label: string;
  description: string;
  forced?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-base">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-slate-800 font-semibold text-xs">{label}</p>
        <p className="text-slate-400 text-[11px] leading-snug">{description}</p>
      </div>
      {forced ? (
        <span className="shrink-0 text-[10px] bg-sky-100 text-sky-700 font-semibold px-2 py-0.5 rounded-full">
          Aktiv
        </span>
      ) : (
        <span className="shrink-0 text-[10px] bg-slate-200 text-slate-500 font-semibold px-2 py-0.5 rounded-full">
          Optional
        </span>
      )}
    </div>
  );
}
