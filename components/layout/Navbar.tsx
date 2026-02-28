'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks, socialLinks, wechatId } from '@/lib/data';

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [copyLabel, setCopyLabel] = useState('WeChat');
  const mobileMenuId = 'mobile-primary-menu';

  const mainLinks = useMemo(() => navigationLinks, []);

  async function handleCopyWechat() {
    try {
      await navigator.clipboard.writeText(wechatId);
      setCopyLabel('Copied');
      setTimeout(() => setCopyLabel('WeChat'), 1200);
    } catch {
      setCopyLabel('Failed');
      setTimeout(() => setCopyLabel('WeChat'), 1200);
    }
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav aria-label="Primary" className="sticky top-0 z-10 border-b border-warm-300/60 bg-warm-50/80 backdrop-blur-md py-4">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className={`font-medium transition-colors duration-200 ${pathname === '/' ? 'text-ink-900 underline underline-offset-4 decoration-sage-500' : 'text-ink-700 hover:text-ink-900'}`}
          >
            Home
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls={mobileMenuId}
            onClick={() => setIsOpen((open) => !open)}
            className="md:hidden text-sm font-medium text-ink-500 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300 rounded px-1 py-1 transition-colors duration-200"
          >
            Menu
          </button>

          <div className="hidden md:flex items-center gap-6">
            {mainLinks.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(pathname, href) ? 'page' : undefined}
                className={`text-sm transition-colors duration-200 ${isActive(pathname, href) ? 'text-ink-900 font-medium underline underline-offset-4 decoration-sage-500' : 'text-ink-500 hover:text-ink-900'}`}
              >
                {label}
              </Link>
            ))}

            {socialLinks.map(({ href, label, external }) => (
              <Link
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noreferrer' : undefined}
                className="text-sm text-ink-400 hover:text-ink-700 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}

            <button
              type="button"
              onClick={handleCopyWechat}
              aria-live="polite"
              className="text-sm text-ink-400 hover:text-ink-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300 rounded"
            >
              {copyLabel}
            </button>
          </div>
        </div>

        {isOpen && (
          <div id={mobileMenuId} className="md:hidden mt-4 rounded-xl border border-warm-300 bg-warm-50 shadow-lg shadow-warm-200/50 p-4">
            <div className="flex flex-col gap-3">
              {mainLinks.slice(1).map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  aria-current={isActive(pathname, href) ? 'page' : undefined}
                  className={`text-sm transition-colors duration-200 ${isActive(pathname, href) ? 'text-ink-900 font-medium' : 'text-ink-500 hover:text-ink-900'}`}
                >
                  {label}
                </Link>
              ))}

              <div className="my-1 h-px bg-warm-200" />

              {socialLinks.map(({ href, label, external }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="text-sm text-ink-500 hover:text-ink-900 transition-colors duration-200"
                >
                  {label}
                </Link>
              ))}

              <button
                type="button"
                onClick={async () => {
                  closeMenu();
                  await handleCopyWechat();
                }}
                aria-live="polite"
                className="text-left text-sm text-ink-500 hover:text-ink-900 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300 rounded"
              >
                {copyLabel}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
