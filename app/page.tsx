import type { Metadata } from 'next';
import FootballGallery from '@/components/home/FootballGallery';
import Hero from '@/components/home/Hero';
import Hobbies from '@/components/home/Hobbies';
import TechStack from '@/components/home/TechStack';
import WorkExperience from '@/components/home/WorkExperience';

export const metadata: Metadata = {
  title: 'Home',
  description: '首页：个人介绍、技术栈、工作经历与兴趣爱好。',
};

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />
      <TechStack />
      <WorkExperience />
      <FootballGallery />
      <Hobbies />
    </div>
  );
}
