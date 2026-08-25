"use client";

import { useContactForm } from "@damshly/next-php-mailer";
import { SITE_INFO } from "@/constants/site";

export function ContactFormSection() {
  const {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    isSuccess,
    isError,
    errorMessage,
    resetForm,
  } = useContactForm(
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "Gebäudereinigung (Büro, Praxis, Unterhalt)",
      message: "",
      _gotcha: "", // Honeypot spam trap
      _subject: "Neue Kontaktanfrage über HDC Website",
    },
    {
      apiEndpoint: "/api/send-email.php",
      resetOnSuccess: true,
    }
  );

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
            {/* رسالة النجاح */}
            {isSuccess && (
              <div className="mb-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3">
                <svg className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-bold text-emerald-900 text-base">Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.</h4>
                  <p className="text-emerald-700 text-sm mt-1">
                    Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich bei Ihnen melden.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-3 text-xs font-semibold text-emerald-800 underline hover:text-emerald-950"
                  >
                    Weitere Nachricht senden
                  </button>
                </div>
              </div>
            )}

            {/* رسالة الخطأ */}
            {isError && (
              <div className="mb-6 p-5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
                <svg className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-bold text-rose-900 text-base">Fehler beim Senden</h4>
                  <p className="text-rose-700 text-sm mt-1">
                    {errorMessage || "Ihre Nachricht konnte leider nicht versendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch."}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Honeypot Field (Bot-Trap) */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold text-sky-600 uppercase mb-2">
                    Vorname <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="Vorname"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold text-sky-600 uppercase mb-2">
                    Nachname <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    disabled={isSubmitting}
                    placeholder="Nachname"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50 disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-sky-600 uppercase mb-2">
                    E-Mail-Adresse <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="name@beispiel.de"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-sky-600 uppercase mb-2">
                    Telefonnummer
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    disabled={isSubmitting}
                    placeholder="0176 ..."
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="service" className="block text-xs font-bold text-sky-600 uppercase mb-2">
                  Gewünschte Leistung
                </label>
                <select
                  id="service"
                  name="service"
                  disabled={isSubmitting}
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50 disabled:opacity-60"
                >
                  <option value="Gebäudereinigung (Büro, Praxis, Unterhalt)">Gebäudereinigung (Büro, Praxis, Unterhalt)</option>
                  <option value="24/7 Winterdienst & Schneeräumung">24/7 Winterdienst & Schneeräumung</option>
                  <option value="Garten- & Außenanlagenpflege">Garten- & Außenanlagenpflege</option>
                  <option value="Allgemeine Anfrage / Sonstiges">Allgemeine Anfrage / Sonstiges</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold text-sky-600 uppercase mb-2">
                  Ihre Nachricht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  disabled={isSubmitting}
                  placeholder="Beschreiben Sie kurz Ihr Objekt oder Anliegen..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50 resize-none disabled:opacity-60"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Wird gesendet...</span>
                    </>
                  ) : (
                    <span>Nachricht absenden</span>
                  )}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
