import { MDXRemote } from 'next-mdx-remote/rsc';
import { Post } from '@/lib/types';

type MomentCardProps = {
  post: Post;
};

export default function MomentCard({ post }: MomentCardProps) {
  return (
    <article className="rounded-lg border border-gray-100 bg-white p-5">
      {post.cover ? (
        <img
          src={post.cover}
          alt={post.title}
          className="mb-4 h-52 w-full rounded-md object-cover"
          loading="lazy"
        />
      ) : null}

      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
      {post.summary ? <p className="mt-2 text-sm text-gray-600 leading-6">{post.summary}</p> : null}

      {post.content ? (
        <div className="mt-4 prose prose-neutral max-w-none">
          <MDXRemote source={post.content} />
        </div>
      ) : null}
    </article>
  );
}
