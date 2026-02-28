import { MDXRemote } from 'next-mdx-remote/rsc';
import { Post } from '@/lib/types';

type MomentCardProps = {
  post: Post;
};

export default function MomentCard({ post }: MomentCardProps) {
  return (
    <article className="rounded-2xl border border-warm-300/60 bg-warm-50 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 animate-fade-up">
      {post.cover ? (
        <img
          src={post.cover}
          alt={post.title}
          className="h-52 w-full object-cover"
          loading="lazy"
        />
      ) : null}

      <div className="p-5">
        <h3 className="font-serif text-lg text-ink-900">{post.title}</h3>
        {post.summary ? <p className="mt-2 text-sm text-ink-600 leading-6">{post.summary}</p> : null}

        {post.content ? (
          <div className="mt-4 prose prose-neutral max-w-none text-sm">
            <MDXRemote source={post.content} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
