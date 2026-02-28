import Link from 'next/link';
import { Post } from '@/lib/types';

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-lg border border-gray-100 p-5 transition-colors duration-200 hover:border-gray-200">
      <Link href={`/blog/${post.slug}`} className="block">
        <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
      </Link>
      {post.date ? <p className="mt-2 text-sm text-gray-500">{post.date}</p> : null}
      {post.summary ? <p className="mt-3 text-gray-600 leading-7">{post.summary}</p> : null}
      {post.tags && post.tags.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <li key={tag} className="text-xs text-gray-500 rounded bg-gray-50 px-2 py-1">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
