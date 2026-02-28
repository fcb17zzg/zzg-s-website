import { MDXRemote } from 'next-mdx-remote/rsc';
import { Post } from '@/lib/types';

type ThoughtCardProps = {
  post: Post;
};

export default function ThoughtCard({ post }: ThoughtCardProps) {
  return (
    <article className="rounded-lg border border-gray-100 bg-white p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        {post.date ? <span>{post.date}</span> : null}
        {post.category ? <span className="rounded bg-gray-50 px-2 py-1">{post.category}</span> : null}
      </div>

      <h3 className="mt-3 text-lg font-semibold text-gray-900">{post.title}</h3>
      {post.summary ? <p className="mt-2 text-sm text-gray-600 leading-6">{post.summary}</p> : null}

      {post.content ? (
        <div className="mt-4 prose prose-neutral max-w-none">
          <MDXRemote source={post.content} />
        </div>
      ) : null}
    </article>
  );
}
