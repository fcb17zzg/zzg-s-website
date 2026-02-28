import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Post } from './types';

const contentDir = path.join(process.cwd(), 'content');

export function getAllPosts(type: string): Post[] {
  const dir = path.join(contentDir, type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
      return { slug: f.replace('.md', ''), ...data } as Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(type: string, slug: string): Post {
  const file = path.join(contentDir, type, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { slug, ...data, content } as Post;
}
