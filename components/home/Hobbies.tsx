import { hobbies } from '@/lib/data';

export default function Hobbies() {
  return (
    <section className="space-y-4 rounded-2xl border border-warm-300/70 bg-warm-100 p-6 animate-fade-up">
      <h2 className="font-serif text-lg text-ink-900">爱好</h2>
      <ul className="flex flex-wrap gap-2 stagger-children">
        {hobbies.map((hobby) => (
          <li
            key={hobby}
            className="animate-fade-up rounded-lg bg-warm-50 border border-warm-300 px-3 py-1.5 text-sm text-ink-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default"
          >
            {hobby}
          </li>
        ))}
      </ul>
    </section>
  );
}
