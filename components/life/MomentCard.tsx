import Link from 'next/link';
import { Post } from '@/lib/types';
import { truncateSummary } from '@/lib/summary';

type MomentCardProps = {
  post: Post;
};

export default function MomentCard({ post }: MomentCardProps) {
  const summary = truncateSummary(post.summary ?? '');

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
        <Link href={`/life/${post.slug}`} className="block group/title">
          <h3 className="font-serif text-lg text-ink-900 group-hover/title:text-sage-600 transition-colors duration-200">{post.title}</h3>
        </Link>
        {summary ? (
          <p className="mt-2 text-sm text-ink-600 leading-6 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]">
            {summary}
          </p>
        ) : null}
      </div>
    </article>
  );
}
