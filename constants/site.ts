import { SERVICES_DATA } from "./servicesData";

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDesc: string;
  tag: string;
  icon: string;
  image: string;
  headline: string;
  intro: string;
  features: string[];
  areas?: string[];
  benefits: string[];
  details?: {
    title: string;
    items: string[];
  }[];
}


export const SITE_INFO = {
  name: "HDC Cleaning Solution",
  owner: "Basil Al Juma",
  street: "Ziegelstraße 36",
  zip: "23556",
  city: "Lübeck",
  country: "Deutschland",
  region: "Lübeck & Umgebung",
  ogImage: "https://hdc-solution.de/images/hero-bg.jpeg",
  phone: "+4915560888113",
  phoneFormatted: "015560888113",
  whatsappNumber: "4915560888113",
  email: "info@hdc-solution.de",
  taxId: "DE458708608",
  workingHours: "Mo-So: 00-24 Uhr (24/7 Notdienst)",
  address: "Ziegelstraße 36, 23556 Lübeck",
  fullAddress: "Ziegelstraße 36, 23556 Lübeck, Deutschland",
  url: "https://hdc-solution.de",
  description: "Professionelle Gebäudedienstleistungen von HDC Cleaning Solution in Lübeck & Umgebung. Zuverlässig, gründlich und flexibel für Firmen, Büros & Privat.",
  navLinks: [
    { name: 'Start', href: '/' },
    { name: 'Leistungen', href: '/leistungen' },
    { name: 'Über HDC', href: '/uber-hdc' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  services: SERVICES_DATA,
  advantages: [
    {
      title: "Full Service",
      desc: "Wir bieten Ihnen ein breites Spektrum an Dienstleistungen aus einer Hand.",
      icon: "Layers",
    },
    {
      title: "Qualität",
      desc: "Höchste Qualität bei allen Reinigungs- und Pflegearbeiten ist unser Anspruch.",
      icon: "ShieldCheck",
    },
    {
      title: "Zuverlässigkeit",
      desc: "Pünktlich, gründlich und vertrauenswürdig – darauf können Sie sich verlassen.",
      icon: "Clock",
    },
    {
      title: "Flexibilität",
      desc: "Wir passen uns Ihren Wünschen und Anforderungen individuell an.",
      icon: "Sparkles",
    },
  ],
};

export const FAQ_DATA = [
  {
    question: "Welche Dienstleistungen bietet HDC genau an?",
    answer:
      "Wir bieten ganzheitliche Gebäudedienstleistungen: Professionelle Gebäudereinigung (Unterhalts-, Büro-, Praxis- und Glasreinigung), zuverlässigen 24/7 Winterdienst für schnee- und eisfreie Wege sowie fachgerechte Garten- und Außenanlagenpflege für Firmen- und Privatkunden.",
  },
  {
    question: "In welchem Einsatzgebiet ist HDC tätig?",
    answer:
      "Unser Schwerpunkt liegt auf der Stadt Schweinfurt sowie dem gesamten Landkreis und den umliegenden Regionen (u.a. Würzburg, Bad Kissingen, Haßberge). Für größere gewerbliche Projekte stehen wir Ihnen nach Absprache auch überregional zur Verfügung.",
  },
  {
    question: "Wie schnell ist Ihr 24/7 Notdienst einsatzbereit?",
    answer:
      "Unser Notdienst ist 24 Stunden an 7 Tagen in der Woche einsatzbereit. Insbesondere beim Winterdienst (Schneeräumung und Streudienst bei Glätte) sowie bei akuten Reinigungseinsätzen rücken wir schnell und zuverlässig aus.",
  },
  {
    question: "Ist die Besichtigung und das Angebot kostenlos?",
    answer:
      "Ja, zu 100%. Wir beraten Sie unverbindlich, besichtigen Ihre Räumlichkeiten oder Außenflächen vor Ort und erstellen Ihnen ein transparentes, maßgeschneidertes Angebot ohne versteckte Kosten.",
  },
  {
    question: "Sind Ihre Mitarbeiter geschult und versichert?",
    answer:
      "Selbstverständlich. Unser Team besteht aus erfahrenen und zuverlässigen Kräften. Zudem ist HDC umfassend betriebshaftpflichtversichert, sodass Ihre Objekte und Einrichtungen rundum geschützt sind.",
  },
  {
    question: "Bieten Sie flexible Reinigungsintervalle an?",
    answer:
      "Ja, ob täglich, wöchentlich, monatlich oder als einmalige Grundreinigung: Wir richten uns flexibel nach Ihren Arbeitszeiten und betrieblichen Abläufen, auch in den frühen Morgenstunden oder am Wochenende.",
  },
];
