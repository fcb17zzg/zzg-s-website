import { profile } from '@/lib/data';

export default function Hero() {
  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm text-gray-500">{profile.name}</p>
          <h1 className="text-3xl font-semibold text-gray-900 leading-tight">{profile.headline}</h1>
        </div>
        <div className="h-14 w-14 shrink-0 rounded-full bg-gray-100 text-gray-600 grid place-items-center text-lg font-medium">
          {profile.name.slice(0, 1).toUpperCase()}
        </div>
      </div>

      <p className="text-gray-600 leading-7">{profile.bio}</p>

      <ul className="flex flex-wrap gap-2">
        {profile.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-gray-50 px-3 py-1 text-xs text-gray-600">
            {tag}
          </li>
        ))}
      </ul>
    </section>
  );
}
