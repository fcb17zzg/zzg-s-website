import Link from 'next/link';
import { Post } from '@/lib/types';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-xl border border-warm-300/60 bg-warm-50 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-up group">
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="font-serif text-xl text-ink-900 group-hover:text-sage-600 transition-colors duration-200">{post.title}</h2>
      </Link>
      {post.date ? <p className="mt-2 text-xs text-ink-400 tracking-wide">{post.date}</p> : null}
      {post.summary ? <p className="mt-3 text-sm text-ink-600 leading-7">{post.summary}</p> : null}
      {post.tags && post.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag} className="text-xs text-ink-500 rounded-md bg-warm-200 border border-warm-300/50 px-2 py-0.5">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
