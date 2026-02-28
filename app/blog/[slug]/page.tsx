import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PostBody from '@/components/blog/PostBody';
import { getAllPosts, getPostBySlug } from '@/lib/mdx';

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const posts = getAllPosts('blog');
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getAllPosts('blog').find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const allSlugs = new Set(getAllPosts('blog').map((post) => post.slug));

  if (!allSlugs.has(slug)) {
    notFound();
  }

  const post = getPostBySlug('blog', slug);

  return (
    <article>
      <header className="mb-8 pb-6 border-b border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
        {post.date ? <p className="mt-3 text-sm text-gray-500">{post.date}</p> : null}
        {post.tags && post.tags.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="text-xs text-gray-500 rounded bg-gray-50 px-2 py-1">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>
      <PostBody content={post.content ?? ''} />
    </article>
  );
}
