import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { SITE_INFO } from "@/constants/site";
import { BuildingServicesSection } from "@/components/services/BuildingServicesSection";
import { WinterServiceSection } from "@/components/services/WinterServiceSection";
import { GardenServiceSection } from "@/components/services/GardenServiceSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SITE_INFO.services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const service = SITE_INFO.services.find((s) => s.id === resolvedParams.slug);

  if (!service) return { title: "Service Nicht Gefunden" };

  return {
    title: `${service.title} in Schweinfurt`,
    description: `${service.description} Zuverlässiger Service von HDC Gebäudedienstleistungen in Schweinfurt & Umgebung.`,
    alternates: {
      canonical: `/leistungen/${service.id}/`,
    },
    openGraph: {
      title: `${service.title} | HDC Schweinfurt`,
      description: service.description,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const service = SITE_INFO.services.find((s) => s.id === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
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
        name: service.title,
        item: `${SITE_INFO.url}/leistungen/${service.id}/`,
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

      <main className="min-h-screen bg-white pt-24">
        {/* Breadcrumb Navigation */}
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-400 flex items-center gap-2">
            <Link href="/" className="hover:text-sky-400 transition-colors">Startseite</Link>
            <span>/</span>
            <Link href="/leistungen" className="hover:text-sky-400 transition-colors">Leistungen</Link>
            <span>/</span>
            <span className="text-slate-200 font-medium">{service.title}</span>
          </div>
        </div>

        {/* Hero Header */}
        <section className="relative bg-slate-900 text-white py-16 sm:py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-sky-400 font-semibold text-xs uppercase tracking-widest bg-sky-950/60 border border-sky-800/50 px-3 py-1 rounded-full">
                {service.tag}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold mt-4 text-white leading-tight">
                {service.title}
              </h1>
              <p className="text-slate-300 mt-4 text-base sm:text-lg leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href="/kontakt"
                  className="bg-sky-600 hover:bg-sky-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md"
                >
                  Jetzt Angebot anfragen
                </Link>
                <a
                  href={`tel:${SITE_INFO.phone}`}
                  className="bg-slate-800 hover:bg-slate-700 text-white font-medium px-6 py-3 rounded-xl transition-colors border border-slate-700"
                >
                  Direkt anrufen: {SITE_INFO.phoneFormatted || SITE_INFO.phone}
                </a>
              </div>
            </div>

            <div className="relative w-full md:w-96 h-64 rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl flex-shrink-0">
              <Image
                src={service.image}
                alt={`${service.title} Schweinfurt`}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Detail Section حسب الخدمة */}
        <div>
          {service.id === "gebaeudereinigung" && <BuildingServicesSection />}
          {service.id === "winterdienst" && <WinterServiceSection />}
          {service.id === "gartenpflege" && <GardenServiceSection />}
        </div>

        {/* Sub-Services Showcase Section */}
        {service.subServices && service.subServices.length > 0 && (
          <section className="py-16 bg-slate-50 border-t border-slate-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-sky-600 font-semibold text-xs uppercase tracking-widest bg-sky-100/80 px-3 py-1 rounded-full border border-sky-200">
                  Spezialbereiche
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                  Spezialisierte Leistungen in {service.title}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base mt-2">
                  Wählen Sie einen unserer maßgeschneiderten Teilbereiche für detaillierte Informationen.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {service.subServices.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/leistungen/${service.slug}/${sub.slug}`}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                      <Image
                        src={sub.image}
                        alt={sub.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-sky-600/95 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs">
                        {sub.tag}
                      </span>
                    </div>

                    <div className="p-6 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                          {sub.title}
                        </h3>
                        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3">
                          {sub.shortDesc}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-600 group-hover:text-sky-700">
                        <span>Details & Leistungen ansehen</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
