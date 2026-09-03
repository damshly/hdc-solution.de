import servicesConfig from "@/config/services.json";

export interface SubService {
  id: string;
  slug: string;
  parentId: string;
  title: string;
  shortDesc: string;
  description: string;
  headline: string;
  intro: string;
  tag: string;
  icon?: string;
  image: string;
  features: string[];
  benefits: string[];
  areas?: string[];
  standards?: string[];
}

export interface MainService {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  headline: string;
  intro: string;
  tag: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  areas?: string[];
  details?: {
    title: string;
    items: string[];
  }[];
  subServices: SubService[];
}

export const SERVICES_DATA: MainService[] = servicesConfig as MainService[];

export function getMainServices(): MainService[] {
  return SERVICES_DATA;
}

export function getServiceBySlug(slug: string): MainService | undefined {
  return SERVICES_DATA.find((s) => s.slug === slug || s.id === slug);
}

export function getSubServiceBySlug(parentSlug: string, subSlug: string): SubService | undefined {
  const parent = getServiceBySlug(parentSlug);
  if (!parent) return undefined;
  return parent.subServices.find((sub) => sub.slug === subSlug || sub.id === subSlug);
}

export function getAllStaticServiceParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

export function getAllStaticSubServiceParams() {
  const params: { slug: string; subSlug: string }[] = [];
  SERVICES_DATA.forEach((service) => {
    service.subServices.forEach((sub) => {
      params.push({
        slug: service.slug,
        subSlug: sub.slug,
      });
    });
  });
  return params;
}
