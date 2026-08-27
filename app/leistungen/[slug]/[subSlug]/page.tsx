import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";
import {
  getServiceBySlug,
  getSubServiceBySlug,
  getAllStaticSubServiceParams,
} from "@/constants/servicesData";

interface SubServicePageProps {
  params: Promise<{ slug: string; subSlug: string }>;
}

export async function generateStaticParams() {
  return getAllStaticSubServiceParams();
}

export async function generateMetadata({ params }: SubServicePageProps) {
  const { slug, subSlug } = await params;
  const parentService = getServiceBySlug(slug);
  const subService = getSubServiceBySlug(slug, subSlug);

  if (!parentService || !subService) {
    return { title: "Leistung nicht gefunden" };
  }

  return {
    title: `${subService.title} | HDC Gebäudedienstleistungen`,
    description: subService.description,
    alternates: {
      canonical: `/leistungen/${slug}/${subSlug}/`,
    },
    openGraph: {
      title: `${subService.title} | ${parentService.title}`,
      description: subService.description,
      images: [{ url: subService.image }],
    },
  };
}

export default async function SubServiceDetailPage({ params }: SubServicePageProps) {
  const { slug, subSlug } = await params;
  const parentService = getServiceBySlug(slug);
  const subService = getSubServiceBySlug(slug, subSlug);

  if (!parentService || !subService) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: subService.title,
    description: subService.description,
    provider: {
      "@type": "LocalBusiness",
      name: SITE_INFO.name,
      telephone: SITE_INFO.phone,
      url: SITE_INFO.url,
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE_INFO.city,
        addressRegion: "Bayern",
        addressCountry: "DE",
      },
    },
    areaServed: {
      "@type": "City",
      name: SITE_INFO.city,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: SITE_INFO.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Leistungen",
        item: `${SITE_INFO.url}/leistungen/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: parentService.title,
        item: `${SITE_INFO.url}/leistungen/${parentService.slug}/`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: subService.title,
        item: `${SITE_INFO.url}/leistungen/${parentService.slug}/${subService.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white pt-28">
        {/* Breadcrumb Navigation */}
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 text-xs text-slate-400 flex flex-wrap items-center gap-2">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Startseite
            </Link>
            <span>/</span>
            <Link href="/leistungen" className="hover:text-sky-400 transition-colors">
              Leistungen
            </Link>
            <span>/</span>
            <Link
              href={`/leistungen/${parentService.slug}`}
              className="hover:text-sky-400 transition-colors"
            >
              {parentService.title}
            </Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">{subService.title}</span>
          </div>
        </div>

        {/* Hero Header */}
        <section className="relative bg-slate-900 text-white py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/40 to-slate-900/90 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sky-400 font-semibold text-xs uppercase tracking-widest bg-sky-950/80 border border-sky-800/60 px-3 py-1 rounded-full">
                  {subService.tag}
                </span>
                <span className="text-slate-400 text-xs">
                  Teil von {parentService.title}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                {subService.title}
              </h1>

              <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed">
                {subService.intro}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/kontakt"
                  className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-sky-600/30 active:scale-98"
                >
                  Unverbindlich Angebot Anfragen
                </Link>
                <a
                  href={`tel:${SITE_INFO.phone}`}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3.5 rounded-xl transition-colors border border-slate-700 flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{SITE_INFO.phoneFormatted}</span>
                </a>
              </div>
            </div>

            {/* Feature Image */}
            <div className="relative w-full md:w-[460px] h-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl flex-shrink-0 group">
              <Image
                src={subService.image}
                alt={subService.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/60 text-xs text-slate-200">
                <span className="font-semibold text-sky-400 block mb-0.5">Qualitätsgarantie</span>
                Professionelle Ausführung & geschultes Fachpersonal
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left Column: Detailed Features */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                    {subService.headline}
                  </h2>
                  <p className="text-slate-600 leading-relaxed text-base">
                    {subService.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Unsere Leistungen im Überblick</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {subService.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/60 shadow-xs">
                        <span className="w-2 h-2 rounded-full bg-sky-600 mt-2 flex-shrink-0" />
                        <span className="text-sm font-medium text-slate-800">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Standards / Certifications (if present) */}
                {subService.standards && (
                  <div className="border border-sky-100 bg-sky-50/50 rounded-2xl p-6 sm:p-8">
                    <h3 className="text-lg font-bold text-sky-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      Hygiene- & Qualitätsstandards
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
                      {subService.standards.map((std, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-sky-600 font-bold">✓</span>
                          <span>{std}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Right Column: Benefits & Target Areas */}
              <div className="space-y-6">
                <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl">
                  <h3 className="text-lg font-bold text-white mb-4 border-b border-slate-800 pb-3">
                    Ihre Vorteile mit HDC
                  </h3>
                  <ul className="space-y-3.5">
                    {subService.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <svg className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-slate-800 text-center">
                    <Link
                      href="/kontakt"
                      className="block w-full bg-sky-600 hover:bg-sky-500 text-white font-semibold py-3 rounded-xl transition-colors shadow-md text-sm"
                    >
                      Jetzt Anfragen
                    </Link>
                  </div>
                </div>

                {/* Einsatzbereiche */}
                {subService.areas && (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80">
                    <h3 className="text-base font-bold text-slate-900 mb-3">
                      Einsatzbereiche
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {subService.areas.map((area, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                          <span>{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Back to main service banner */}
        <section className="bg-slate-50 border-t border-slate-200/80 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-slate-600 text-sm mb-4">
              Möchten Sie mehr über das gesamte Spektrum unserer Gebäudeleistungen erfahren?
            </p>
            <Link
              href={`/leistungen/${parentService.slug}`}
              className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 text-sm"
            >
              <span>Zurück zur Übersicht {parentService.title}</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
