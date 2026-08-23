import { ContactHero } from "@/components/contact/ContactHero";
import { ContactFormSection } from "@/components/contact/ContactFormSection";
import { ContactMapSection } from "@/components/contact/ContactMapSection";

export const metadata = {
  title: "Kontakt | HDC Gebäudedienstleistungen",
  description: "Nehmen Sie Kontakt mit HDC Gebäudedienstleistungen auf. Wir freuen uns auf Ihre Anfrage!",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <ContactHero />
      <ContactFormSection />
      <ContactMapSection />
    </main>
  );
}
