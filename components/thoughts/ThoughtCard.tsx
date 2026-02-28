import { MDXRemote } from 'next-mdx-remote/rsc';
import { Post } from '@/lib/types';

type ThoughtCardProps = {
  post: Post;
};

export default function ThoughtCard({ post }: ThoughtCardProps) {
  return (
    <article className="rounded-xl border border-warm-300/60 bg-warm-50 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-up">
      <div className="flex flex-wrap items-center gap-2 text-xs text-ink-400">
        {post.date ? <span>{post.date}</span> : null}
        {post.category ? (
          <span className="rounded-full bg-sage-100 border border-sage-200 px-2.5 py-0.5 text-sage-700 font-medium">
            {post.category}
          </span>
        ) : null}
      </div>

      <h3 className="mt-3 font-serif text-lg text-ink-900">{post.title}</h3>
      {post.summary ? <p className="mt-2 text-sm text-ink-600 leading-6">{post.summary}</p> : null}

      {post.content ? (
        <div className="mt-4 prose prose-neutral max-w-none text-sm">
          <MDXRemote source={post.content} />
        </div>
      ) : null}
    </article>
  );
}
