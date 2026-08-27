"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_INFO, FAQ_DATA } from "@/constants/site";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sky-700 font-bold text-sm tracking-widest uppercase">
            Häufige Fragen
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-4">
            Fragen & Antworten zu unserem Service
          </h2>
          <p className="text-slate-700 text-base">
            Hier finden Sie Antworten auf die wichtigsten Fragen. Haben Sie weitere Fragen? Wir beraten Sie gerne persönlich.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-sky-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                >
                  <span className="text-base sm:text-lg">{item.question}</span>
                  <span
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-sky-100 text-sky-600" : "text-slate-500"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 p-6 sm:p-8 bg-white border border-sky-100 rounded-2xl shadow-sm text-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Haben Sie eine andere Frage?
          </h3>
          <p className="text-slate-600 text-sm mb-4">
            Rufen Sie uns unverbindlich an oder schreiben Sie uns eine Nachricht.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              <span>{SITE_INFO.phoneFormatted || SITE_INFO.phone} anrufen</span>
            </a>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              <span>Kontaktformular öffnen</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
