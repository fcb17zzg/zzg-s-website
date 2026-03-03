import Image from 'next/image';
import { footballGallery } from '@/lib/data';

export default function FootballGallery() {
  const stackStyles = [
    'rotate-[-6deg] translate-y-2 z-10',
    'rotate-[5deg] -translate-y-1 z-20',
    'rotate-[-2deg] translate-y-3 z-30',
    'rotate-[7deg] translate-y-1 z-10',
    'rotate-[-5deg] -translate-y-2 z-20',
    'rotate-[3deg] translate-y-2 z-30',
  ];

  return (
    <section className="space-y-4 rounded-2xl border border-warm-300/70 bg-warm-100 p-6 animate-fade-up">
      <h2 className="font-serif text-lg text-ink-900">{footballGallery.title}</h2>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-children">
        {footballGallery.images.map((image, index) => (
          <li
            key={image.src}
            className={`animate-fade-up rounded-xl border border-warm-300/60 bg-warm-50 p-2 shadow-sm transition-all duration-500 hover:z-40 hover:rotate-0 hover:-translate-y-2 hover:shadow-lg ${stackStyles[index % stackStyles.length]}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
