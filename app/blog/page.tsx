import PostCard from '@/components/blog/PostCard';
import { getAllPosts } from '@/lib/mdx';

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
