import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/HeroServices";
import Advantages from "@/components/home/Advantages";
import Process from "@/components/home/Process";
import About from "@/components/home/HeroAbout";
import Gallery from "@/components/home/Gallery";
import FAQ from "@/components/home/FAQ";
import CtaBanner from "@/components/home/CtaBanner";
import { SITE_INFO, FAQ_DATA } from "@/constants/site";

export const metadata: Metadata = {
  title: "HDC Gebäudedienstleistungen Schweinfurt | Reinigung & 24/7 Winterdienst",
  description:
    "Ihr Partner für professionelle Gebäudereinigung, 24/7 Winterdienst und Gartenpflege in Schweinfurt & Umgebung. Zuverlässig, gründlich und flexibel für Firmen & Privat.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_INFO.name,
    image: `${SITE_INFO.url}/images/hero-bg.jpeg`,
    "@id": SITE_INFO.url,
    url: SITE_INFO.url,
    telephone: SITE_INFO.phone,
    email: SITE_INFO.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_INFO.city,
      addressRegion: "Bayern",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "50.0456",
      longitude: "10.2335",
    },
    areaServed: [
      { "@type": "City", name: "Schweinfurt" },
      { "@type": "AdministrativeArea", name: "Unterfranken" },
      { "@type": "City", name: "Würzburg" },
      { "@type": "City", name: "Bad Kissingen" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Gebäudedienstleistungen",
      itemListElement: SITE_INFO.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.title,
          description: s.description,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-sky-500 selection:text-white">
        <Hero />
        <Services />
        <Advantages />
        <Process />
        <About />
        <Gallery />
        <FAQ />
        <CtaBanner />
      </main>
    </>
  );
}
