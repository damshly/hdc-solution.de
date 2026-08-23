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
      </main>
    </>
  );
}
