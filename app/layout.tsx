import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: {
    default: "zzg's website",
    template: "%s | zzg's website",
  },
  description: '个人网站，记录技术实践、生活片段与随想。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-white text-gray-800 antialiased">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-12">{children}</main>
      </body>
    </html>
  );
}
