import type { Metadata } from 'next';
import PostCard from '@/components/blog/PostCard';
import { getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Blog',
  description: '技术博客列表：包含文章标题、日期、摘要与标签。',
};

export default function BlogPage() {
  const posts = getAllPosts('blog');

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </section>
  );
}
