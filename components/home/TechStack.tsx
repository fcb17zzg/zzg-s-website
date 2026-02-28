import { techStack } from '@/lib/data';

export default function TechStack() {
  return (
    <section className="space-y-4 rounded-lg border border-gray-100 bg-gray-50/50 p-5">
      <h2 className="text-lg font-semibold text-gray-900">技术栈</h2>
      <ul className="flex flex-wrap gap-2">
        {techStack.map((item) => (
          <li key={item} className="rounded bg-white px-3 py-1.5 text-sm text-gray-700 border border-gray-100">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
