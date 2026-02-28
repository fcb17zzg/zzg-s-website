import { techStack } from '@/lib/data';

export default function TechStack() {
  return (
    <section className="space-y-4 rounded-2xl border border-warm-300/70 bg-warm-100 p-6 animate-fade-up">
      <h2 className="font-serif text-lg text-ink-900">技术栈</h2>
      <ul className="flex flex-wrap gap-2 stagger-children">
        {techStack.map((item) => (
          <li
            key={item}
            className="animate-fade-up rounded-lg bg-warm-50 border border-warm-300 px-3 py-1.5 text-sm text-ink-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-default"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
