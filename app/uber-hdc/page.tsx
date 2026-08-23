import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutWhyUs } from "@/components/about/AboutWhyUs";

export const metadata = {
  title: "Über uns | HDC Gebäudedienstleistungen",
  description: "Erfahren Sie mehr über HDC Gebäudedienstleistungen in Schweinfurt – Unsere Werte, Erfahrung und Philosophie.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutWhyUs />
    </main>
  );
}
