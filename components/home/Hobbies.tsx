import { hobbies } from '@/lib/data';

export default function Hobbies() {
  return (
    <section className="space-y-4 rounded-lg border border-gray-100 bg-gray-50/50 p-5">
      <h2 className="text-lg font-semibold text-gray-900">爱好</h2>
      <ul className="flex flex-wrap gap-2">
        {hobbies.map((hobby) => (
          <li key={hobby} className="rounded bg-white px-3 py-1.5 text-sm text-gray-700 border border-gray-100">
            {hobby}
          </li>
        ))}
      </ul>
    </section>
  );
}
