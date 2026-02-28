import Link from 'next/link';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <section className="space-y-4 rounded-lg border border-gray-100 bg-gray-50/50 p-5">
      <h2 className="text-lg font-semibold text-gray-900">项目</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.name} className="rounded-md border border-gray-100 bg-white p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-medium text-gray-900">{project.name}</h3>
              <Link
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors duration-200"
              >
                查看
              </Link>
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-600">{project.desc}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li key={tag} className="rounded bg-gray-50 px-2 py-1 text-xs text-gray-500">
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
