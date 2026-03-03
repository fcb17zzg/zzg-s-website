import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostBody from '@/components/blog/PostBody';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';

type ThoughtsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getAllPosts('thoughts');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ThoughtsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts('thoughts').find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function ThoughtsDetailPage({ params }: ThoughtsDetailPageProps) {
  const { slug } = await params;
  const allSlugs = new Set(getAllPosts('thoughts').map((post) => post.slug));

  if (!allSlugs.has(slug)) {
    notFound();
  }

  const post = getPostBySlug('thoughts', slug);

  return (
    <article>
      <header className="mb-8 pb-6 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-2 text-xs text-ink-400">
          {post.date ? <span>{post.date}</span> : null}
          {post.category ? (
            <span className="rounded-full bg-sage-100 border border-sage-200 px-2.5 py-0.5 text-sage-700 font-medium">
              {post.category}
            </span>
          ) : null}
        </div>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">{post.title}</h1>
        {post.summary ? <p className="mt-4 text-sm text-gray-600 leading-7">{post.summary}</p> : null}
      </header>
      <PostBody content={post.content ?? ''} />
    </article>
  );
}
