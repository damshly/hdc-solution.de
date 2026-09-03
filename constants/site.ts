import siteConfig from "@/config/site.json";
import faqConfig from "@/config/faq.json";
import { SubService } from "@/constants/servicesData";

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
  subServices?: SubService[];
}

export interface SiteInfo {
  name: string;
  city: string;
  region: string;
  ogImage: string;
  phone: string;
  phoneFormatted: string;
  whatsappNumber: string;
  email: string;
  owner: string;
  street: string;
  zip: string;
  country: string;
  taxId: string;
  workingHours: string;
  address: string;
  fullAddress: string;
  url: string;
  description: string;
  navLinks: Array<{ name: string; href: string }>;
  services: ServiceItem[];
  advantages: Array<{ title: string; desc: string; icon: string }>;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const SITE_INFO: SiteInfo = siteConfig as SiteInfo;
export const FAQ_DATA: FaqItem[] = faqConfig as FaqItem[];
