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
  name: "HDC Gebäudedienstleistungen",
  city: "Schweinfurt",
  region: "Schweinfurt, Würzburg, Bad Kissingen & Umgebung",
  ogImage: "https://hdc-dienstleistungen.de/images/hero-bg.jpeg",
  phone: "+49 176 83038661",
  phoneFormatted: "0176 83038661",
  whatsappNumber: "4917683038661",
  email: "info@hdc-dienstleistungen.de",
  workingHours: "Mo-So: 00-24 Uhr (24/7 Notdienst)",
  address: "Schweinfurt & Umgebung",
  fullAddress: "Schweinfurt und Landkreis, Bayern",
  url: "https://hdc-dienstleistungen.de",
  description: "Professionelle Gebäudedienstleistungen in Schweinfurt & Umgebung. Zuverlässig, gründlich und flexibel für Firmen, Büros & Privat.",
  navLinks: [
    { name: 'Start', href: '/' },
    { name: 'Leistungen', href: '/leistungen' },
    { name: 'Über HDC', href: '/uber-hdc' },
    { name: 'Kontakt', href: '/kontakt' },
  ],
  services: [
    {
      id: "gebaeudereinigung",
      slug: "gebaeudereinigung",
      title: "Gebäudereinigung",
      shortDesc: "Gründliche und zuverlässige Reinigung für Büro-, Praxis- und Wohnräume.",
      description: "Wir bieten Ihnen eine gründliche und zuverlässige Reinigung Ihrer Räumlichkeiten – für einen stets gepflegten Eindruck.",
      headline: "Individuelle Reinigungslösungen für Ihr Gebäude",
      intro: "Wir bieten professionelle Gebäudereinigung für Firmen- und Privatkunden. Unser Service umfasst Unterhaltsreinigung, Grundreinigung und Sonderreinigung – individuell angepasst an Ihre Wünsche und betrieblichen Abläufe.",
      tag: "Top Service",
      icon: "Sparkles",
      image: "/images/service-1.jpeg",
      features: [
        "Unterhaltsreinigung (Büros, Praxen, Kanzleien)",
        "Grundreinigung & Bauendreinigung",
        "Glas- & Fensterreinigung (streifenfrei)",
        "Treppenhausreinigung & Objektpflege",
        "Hygienereinigung & Desinfektion",
      ],
      benefits: [
        "Feste Reinigungsintervalle nach Wunsch (täglich, wöchentlich, monatlich)",
        "Einsatz moderner & umweltschonender Reinigungsmittel",
        "Geschultes, festangestelltes und haftpflichtversichertes Personal",
        "Höchste Diskretion und Zuverlässigkeit",
      ],
      areas: [
        "Büros & Verwaltungsgebäude",
        "Arztpraxen & Gesundheitszentren",
        "Hotels & Ferienwohnungen",
        "Treppenhäuser & Wohnanlagen",
        "Kindergärten, Schulen & Bildungseinrichtungen",
        "Fitnessstudios & Sportstätten",
        "Einkaufszentren & Verkaufsflächen",
        "Autohäuser & Ausstellungsräume",
        "Produktions- & Lagerhallen",
        "Baustellen & Neubauten",
      ],
    },
    {
      id: "winterdienst",
      slug: "winterdienst",
      title: "24/7 Winterdienst",
      shortDesc: "24/7 Schneeräumung und Streudienst für schnee- und eisfreie Wege.",
      description: "Kommen Sie sicher durch den Winter mit unserem 24/7 Winterdienst. Wir sorgen für schneefreie und sichere Wege.",
      headline: "Zuverlässiger 24/7 Winterdienst für maximale Sicherheit",
      intro: "Zuverlässiger 24/7 Winterdienst für private und gewerbliche Kunden – damit Wege, Parkplätze und Zufahrten auch bei starkem Schneefall und Glatteis sicher begehbar und befahrbar bleiben.",
      tag: "24/7 Verfügbar",
      icon: "Snowflake",
      image: "/images/service-2.jpeg",
      features: [
        "24/7 Schneeräumung von Gehwegen, Straßen & Parkplätzen",
        "Vorbeugender und akuter Streudienst gegen Glätte",
        "Eisbeseitigung an Treppen und Eingangsbereichen",
        "Entfernung von Streugut nach der Wintersaison",
        "Räumung von Betriebs- und Werksgeländen",
      ],
      benefits: [
        "24/7 Einsatzbereitschaft & Wetter-Monitoring",
        "Einhaltung der gesetzlichen Räum- und Streupflichten",
        "Professioneller Maschinen- & Fuhrpark",
        "Haftungsübernahme und Versicherungsschutz",
        "Transparente Pauschal- oder Einsatzabrechnung",
      ],
      areas: [
        "Gewerbliche Parkplätze & Kundenparkflächen",
        "Öffentliche & private Gehwege",
        "Wohnanlagen & Eigentümergemeinschaften",
        "Einfahrten, Rampen & Ladezonen",
        "Treppenanlagen & Hauseingänge",
        "Industrie- & Gewerbeparks",
      ],
    },
    {
      id: "gartenpflege",
      slug: "gartenpflege",
      title: "Garten- & Außenpflege",
      shortDesc: "Professionelle Pflege von Grünflächen, Hecken und Außenbereichen.",
      description: "Wir kümmern uns um die Pflege Ihrer Grünanlagen und Außenbereiche für ein repräsentatives Gesamtbild.",
      headline: "Fachgerechte Pflege für Grünanlagen und Außenbereiche",
      intro: "Eine gepflegte Außenanlage ist die Visitenkarte Ihrer Immobilie. Wir bieten privaten und gewerblichen Kunden eine umfassende und fachgerechte Pflege für einen dauerhaft repräsentativen Eindruck.",
      tag: "Außenbereich",
      icon: "Trees",
      image: "/images/service-3.jpeg",
      features: [
        "Rasenpflege (Mähen, Düngen, Vertikutieren, Kantenschnitt)",
        "Hecken-, Strauch- und Baumschnitt",
        "Fachgerechte Unkrautbeseitigung auf Beeten & Pflasterflächen",
        "Laubbeseitigung & Entsorgung von Grünschnitt",
        "Reinigung von Hof- und Verkehrsflächen",
      ],
      benefits: [
        "Regelmäßige Pflege nach individuellem Wartungsplan",
        "Flexible Pflegeintervalle nach Bedarf",
        "Fachgerechte und umweltbewusste Entsorgung aller Grünabfälle",
        "Modernes Profi-Gerät für leises und effizientes Arbeiten",
      ],
      details: [
        {
          title: "Gartenpflege",
          items: [
            "Rasenmähen und Rasenkanten stutzen",
            "Fachgerechte Unkrautbeseitigung & Pflege",
            "Laubsammlung und Entsorgung der Grünabfälle",
            "Formschnitt und Pflege von Hecken und Sträuchern",
          ],
        },
        {
          title: "Außenanlagenpflege",
          items: [
            "Reinigung und Pflege von Gehwegen und Zufahrten",
            "Kehren von Höfen, Parkplätzen und Werksgeländen",
            "Unkrautentfernung aus Fugen und Pflasterungen",
            "Reinigung von Rinnen, Abläufen und Lichtschächten",
          ],
        },
      ],
      areas: [
        "Gewerbeobjekte & Firmenareale",
        "Wohnanlagen & Mietshäuser",
        "Privatgärten & Grundstücke",
        "Öffentliche & kommunale Außenflächen",
      ],
    },
  ],
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
