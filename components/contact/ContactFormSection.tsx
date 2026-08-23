"use client";

import { useState } from "react";
import { SITE_INFO } from "@/constants/site";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic لإرسال النموذج عبر API أو EmailJS
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* العمود الأيسر: بيانات التواصل والمعلومات */}
          <div className="lg:col-span-5 space-y-8 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            <div>
              <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider">Phone</h3>
              <a
                href={`tel:${SITE_INFO.phone}`}
                className="text-lg font-semibold text-slate-800 hover:text-sky-600 transition-colors mt-1 block"
              >
                {SITE_INFO.phoneFormatted}
              </a>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider">Address</h3>
              <p className="text-slate-700 text-sm mt-1 leading-relaxed">
                Ziegelstraße 36,<br />
                23556 Lübeck
              </p>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-3">Socials</h3>
              <div className="flex items-center gap-4 text-slate-500">
                <a href="#" className="hover:text-sky-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href="#" className="hover:text-sky-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* العمود الأيمن: نموذج التواصل */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-sky-600 uppercase mb-2">
                    Name <span className="text-red-500">*</span>
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
                  <label className="block text-xs font-bold text-sky-600 uppercase mb-2 invisible sm:visible">
                    Nachname
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

              <div>
                <label className="block text-xs font-bold text-sky-600 uppercase mb-2">
                  E-Mail-Adresse <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Ihre E-Mail-Adresse"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-sky-600 uppercase mb-2">
                  Kommentar oder Nachricht
                </label>
                <textarea
                  rows={5}
                  placeholder="Ihre Nachricht an uns..."
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
                  Absenden
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
