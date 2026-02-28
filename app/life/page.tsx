import type { Metadata } from 'next';
import MomentCard from '@/components/life/MomentCard';
import { getAllPosts } from '@/lib/mdx';
import { Post } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Life',
  description: '生活时间轴：按日期分组，支持封面图与正文配图。',
};

function groupPostsByDate(posts: Post[]) {
  return posts.reduce<Record<string, Post[]>>((accumulator, post) => {
    const key = post.date || '未标注日期';
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(post);
    return accumulator;
  }, {});
}

export default function LifePage() {
  const posts = getAllPosts('life');

  if (posts.length === 0) {
    return null;
  }

  const groupedPosts = groupPostsByDate(posts);
  const dateGroups = Object.entries(groupedPosts);

  return (
    <section className="space-y-8">
      {dateGroups.map(([date, items]) => (
        <div key={date} className="grid grid-cols-[100px_1fr] gap-4">
          <div className="pt-1">
            <p className="text-sm text-gray-500">{date}</p>
          </div>

          <div className="relative space-y-4 pl-5">
            <div className="absolute left-0 top-1 bottom-0 w-px bg-gray-200" aria-hidden="true" />
            {items.map((post) => (
              <div key={post.slug} className="relative">
                <span
                  className="absolute -left-[21px] top-6 h-2.5 w-2.5 rounded-full bg-gray-300"
                  aria-hidden="true"
                />
                <MomentCard post={post} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
