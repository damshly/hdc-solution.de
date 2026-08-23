"use client";

import { useState } from "react";
import { SITE_INFO } from "@/constants/site";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "gebaeudereinigung",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic لإرسال النموذج عبر API أو EmailJS (متروك للربط اللاحق)
    console.log("Form Submitted:", formData);
  };

  return (
    <section id="contact-form" className="py-16 bg-slate-50 border-b border-slate-200 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* العمود الأيسر: بيانات التواصل والمعلومات */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider">Telefon & 24/7 Notdienst</h3>
              <a
                href={`tel:${SITE_INFO.phone}`}
                className="text-lg font-semibold text-slate-800 hover:text-sky-600 transition-colors mt-1 block"
              >
                {SITE_INFO.phoneFormatted || SITE_INFO.phone}
              </a>
              <span className="text-xs text-slate-500 block mt-1">
                {SITE_INFO.workingHours}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider">E-Mail</h3>
              <a
                href={`mailto:${SITE_INFO.email}`}
                className="text-slate-800 font-semibold hover:text-sky-600 transition-colors mt-1 block text-sm sm:text-base"
              >
                {SITE_INFO.email}
              </a>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider">Standort & Region</h3>
              <p className="text-slate-700 text-sm mt-1 leading-relaxed">
                {SITE_INFO.name}<br />
                {SITE_INFO.fullAddress}
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-2">WhatsApp Schnellkontakt</h3>
              <a
                href={`https://wa.me/${SITE_INFO.whatsappNumber}?text=${encodeURIComponent("Hallo HDC Team, ich interessiere mich für Ihre Dienstleistungen.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
              >
                <span>💬 Direkt per WhatsApp schreiben</span>
              </a>
            </div>
          </div>

          {/* العمود الأيمن: نموذج التواصل */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sky-600 uppercase mb-2">
                    Vorname <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Vorname"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sky-600 uppercase mb-2">
                    Nachname <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nachname"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sky-600 uppercase mb-2">
                    E-Mail-Adresse <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@beispiel.de"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-sky-600 uppercase mb-2">
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    placeholder="0176 ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-sky-600 uppercase mb-2">
                  Gewünschte Leistung
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50"
                >
                  <option value="gebaeudereinigung">Gebäudereinigung (Büro, Praxis, Unterhalt)</option>
                  <option value="winterdienst">24/7 Winterdienst & Schneeräumung</option>
                  <option value="gartenpflege">Garten- & Außenanlagenpflege</option>
                  <option value="allgemein">Allgemeine Anfrage / Sonstiges</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-sky-600 uppercase mb-2">
                  Ihre Nachricht
                </label>
                <textarea
                  rows={4}
                  placeholder="Beschreiben Sie kurz Ihr Objekt oder Anliegen..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50 resize-none"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-block bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 active:scale-95"
                >
                  Nachricht absenden
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
