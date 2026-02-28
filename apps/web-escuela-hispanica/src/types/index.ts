export interface LocalizedText {
  es: string;
  en: string;
  pt: string;
}

export interface Article {
  id: number;
  slug: string;
  title: string | LocalizedText;
  author: string;
  date: string;
  category: string | LocalizedText;
  excerpt: string | LocalizedText;
  content: string | LocalizedText;
  image: string;
  authorImage?: string;
  isFeatured?: boolean;
}

export interface Activity {
  id: number;
  slug: string;
  title: string | LocalizedText;
  date: string;
  endDate?: string;
  location?: string | LocalizedText;
  organizer?: string | LocalizedText;
  type?: string | LocalizedText;
  excerpt: string | LocalizedText;
  content: string | LocalizedText;
  image: string;
  phone?: string;
  email?: string;
  web?: string;
  gallery?: { src: string; caption: string | LocalizedText }[];
  isFeatured?: boolean;
  isUpcoming?: boolean;
}

export interface Author {
  id: string;
  name: string;
  period: string;
  description: string | LocalizedText;
  region: string;
  biography?: string | LocalizedText;
  works?: string[];
  image?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string | LocalizedText;
  subtitle: string | LocalizedText;
  description: string | LocalizedText;
  image: string;
  status: 'active' | 'completed' | 'upcoming';
}

export interface TimelineEvent {
  id: string;
  year: number;
  title: string | LocalizedText;
  description: string | LocalizedText;
  category: 'political' | 'intellectual' | 'cultural' | 'milestone';
  author?: string;
  work?: string;
  significance?: string | LocalizedText;
}

export interface MemberPlan {
  id: string;
  name: string;
  subtitle?: string;
  type: 'amigo' | 'academico' | 'mecenas';
  price: number;
  currency: string;
  interval: 'monthly' | 'annual';
  features: (string | LocalizedText)[];
  highlighted?: boolean;
}

export interface BiblioItem {
  id: number;
  type: 'Libro' | 'Artículo' | 'Vídeo' | 'Documento';
  title: string;
  author: string;
  year: string;
  tag: string;
}

export interface MultimediaItem {
  id: number;
  type: 'Vídeo' | 'Audio' | 'Documento';
  title: string;
  duration: string;
  source: string;
  author: string;
}

export interface Resource {
  id: number;
  category: 'libro' | 'articulo' | 'otro';
  citation: string;
  url?: string;
}

// Navigation types
export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};
