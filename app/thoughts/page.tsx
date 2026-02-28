import type { Metadata } from 'next';
import Link from 'next/link';
import ThoughtCard from '@/components/thoughts/ThoughtCard';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Thoughts',
  description: '随想与推荐：支持按分类 Tab 过滤的内容列表。',
};

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'book', label: 'Book' },
  { key: 'movie', label: 'Movie' },
  { key: 'music', label: 'Music' },
  { key: 'idea', label: 'Idea' },
] as const;

type ThoughtsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ThoughtsPage({ searchParams }: ThoughtsPageProps) {
  const resolvedSearchParams = await searchParams;
  const activeCategory = tabs.some((tab) => tab.key === resolvedSearchParams.category)
    ? resolvedSearchParams.category ?? 'all'
    : 'all';

  const postsMeta = getAllPosts('thoughts');
  const filtered =
    activeCategory === 'all'
      ? postsMeta
      : postsMeta.filter((post) => post.category === activeCategory);

  if (postsMeta.length === 0) {
    return null;
  }

  const posts = filtered.map((meta) => getPostBySlug('thoughts', meta.slug));

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-2 border-b border-warm-300/60 pb-3">
        {tabs.map((tab) => {
          const href = tab.key === 'all' ? '/thoughts' : `/thoughts?category=${tab.key}`;
          const isActive = activeCategory === tab.key;

          return (
            <Link
              key={tab.key}
              href={href}
              className={`rounded-lg px-3 py-1.5 text-sm transition-all duration-200 ${isActive ? 'bg-ink-900 text-warm-50 shadow-sm' : 'bg-warm-200 text-ink-600 hover:bg-warm-300'}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <ThoughtCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
