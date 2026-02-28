import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Hobbies from '@/components/home/Hobbies';
import Projects from '@/components/home/Projects';
import TechStack from '@/components/home/TechStack';

export const metadata: Metadata = {
  title: 'Home',
  description: '首页：核心定位、技术栈、项目与兴趣爱好。',
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <TechStack />
      <Projects />
      <Hobbies />
    </div>
  );
}
