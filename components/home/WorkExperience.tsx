import { workExperience } from '@/lib/data';

export default function WorkExperience() {
  return (
    <section className="space-y-4 rounded-2xl border border-warm-300/70 bg-warm-100 p-6 animate-fade-up">
      <h2 className="font-serif text-lg text-ink-900">工作</h2>

      <article className="rounded-xl border border-warm-300/60 bg-warm-50 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-medium text-ink-900">{workExperience.company}</h3>
          <span className="text-xs text-ink-500">{workExperience.period}</span>
        </div>
        <p className="mt-1 text-sm text-sage-700">{workExperience.role}</p>
        <p className="mt-3 text-sm leading-6 text-ink-600">{workExperience.summary}</p>

        <ul className="mt-3 space-y-2 text-sm text-ink-600">
          {workExperience.highlights.map((item) => (
            <li key={item} className="leading-6">
              · {item}
            </li>
          ))}
        </ul>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {workExperience.tech.map((tag) => (
            <li key={tag} className="rounded-md bg-sage-100 border border-sage-200 px-2 py-0.5 text-xs text-sage-700">
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
