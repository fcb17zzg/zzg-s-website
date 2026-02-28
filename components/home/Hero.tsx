import Image from 'next/image';
import { profile } from '@/lib/data';

export default function Hero() {
  return (
    <section className="space-y-5 animate-fade-up">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm text-ink-400 tracking-wide">{profile.name}</p>
          <h1 className="font-serif italic text-3xl text-ink-900 leading-snug">{profile.headline}</h1>
        </div>
        <div className="shrink-0">
          <Image
            src="/images/个人头像.jpg"
            alt={profile.name}
            width={64}
            height={64}
            className="rounded-full ring-2 ring-warm-300 ring-offset-2 ring-offset-warm-50 object-cover"
            priority
          />
        </div>
      </div>

      <p className="text-ink-600 leading-8 text-[15px]">{profile.bio}</p>

      <ul className="flex flex-wrap gap-2">
        {profile.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-warm-200 border border-warm-300 px-3.5 py-1 text-xs text-ink-600 font-medium">
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}
