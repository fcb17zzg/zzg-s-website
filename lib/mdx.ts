import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';

const contentDir = path.join(process.cwd(), 'content');

function normalizePostMeta(slug: string, data: Record<string, unknown>): Post {
  return {
    slug,
    title: typeof data.title === 'string' ? data.title : slug,
    date: typeof data.date === 'string' ? data.date : '',
    tags: Array.isArray(data.tags) ? data.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    summary: typeof data.summary === 'string' ? data.summary : '',
    category: typeof data.category === 'string' ? data.category : undefined,
    cover: typeof data.cover === 'string' ? data.cover : undefined,
  };
}

function compareByDateDesc(a: Post, b: Post) {
  const dateA = Date.parse(a.date);
  const dateB = Date.parse(b.date);
  const fallback = a.slug.localeCompare(b.slug);

  if (Number.isNaN(dateA) && Number.isNaN(dateB)) return fallback;
  if (Number.isNaN(dateA)) return 1;
  if (Number.isNaN(dateB)) return -1;
  return dateB - dateA;
}

export function getAllPosts(type: string): Post[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      const slug = f.replace('.md', '');
      return normalizePostMeta(slug, data);
    })
    .sort(compareByDateDesc);
}

export function getPostBySlug(type: string, slug: string): Post {
  const file = path.join(contentDir, type, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));

  return {
    ...normalizePostMeta(slug, data),
    content,
  };
}
