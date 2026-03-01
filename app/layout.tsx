import type { Metadata } from 'next';
import { Lora, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "zzg's website",
    template: "%s | zzg's website",
  },
  description: '个人网站，记录技术实践、生活片段与随想。',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${lora.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-warm-50 text-ink-700 antialiased">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 pt-28 pb-12">{children}</main>
      </body>
    </html>
  );
}
