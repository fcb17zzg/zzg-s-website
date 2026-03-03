import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostBody from '@/components/blog/PostBody';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';

type LifeDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getAllPosts('life');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: LifeDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts('life').find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function LifeDetailPage({ params }: LifeDetailPageProps) {
  const { slug } = await params;
  const allSlugs = new Set(getAllPosts('life').map((post) => post.slug));

  if (!allSlugs.has(slug)) {
    notFound();
  }

  const post = getPostBySlug('life', slug);

  return (
    <article>
      <header className="mb-8 pb-6 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        {post.date ? <p className="mt-3 text-sm text-gray-500">{post.date}</p> : null}
        {post.summary ? <p className="mt-4 text-sm text-gray-600 leading-7">{post.summary}</p> : null}
      </header>

      {post.cover ? (
        <img
          src={post.cover}
          alt={post.title}
          className="mb-8 h-72 w-full rounded-xl object-cover"
          loading="lazy"
        />
      ) : null}

      <PostBody content={post.content ?? ''} />
    </article>
  );
}
