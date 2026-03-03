export interface Post {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  summary?: string;
  category?: string;
  cover?: string;
  content?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  tech: string[];
}

export interface FootballGalleryImage {
  src: string;
  alt: string;
}

export interface FootballGallery {
  title: string;
  images: FootballGalleryImage[];
}
