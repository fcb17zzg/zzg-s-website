import Link from 'next/link';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <section className="space-y-4 rounded-2xl border border-warm-300/70 bg-warm-100 p-6 animate-fade-up">
      <h2 className="font-serif text-lg text-ink-900">项目</h2>
      <ul className="space-y-3 stagger-children">
        {projects.map((project) => (
          <li
            key={project.name}
            className="animate-fade-up rounded-xl border border-warm-300/60 bg-warm-50 p-4 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium text-ink-900">{project.name}</h3>
              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-sage-600 hover:text-sage-700 font-medium transition-colors duration-200 underline underline-offset-2"
              >
                查看 →
              </Link>
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-600">{project.desc}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded-md bg-sage-100 border border-sage-200 px-2 py-0.5 text-xs text-sage-700">
                  {tag}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
