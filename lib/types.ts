export interface Post {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  summary?: string;
  category?: string;
  content?: string;
}
