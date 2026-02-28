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
    <nav aria-label="Primary" className="border-b border-gray-100 py-4">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            aria-current={pathname === '/' ? 'page' : undefined}
            className={`font-medium transition-colors duration-200 ${pathname === '/' ? 'text-gray-900' : 'text-gray-700 hover:text-gray-900'}`}
          >
            Home
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="md:hidden text-sm font-medium text-gray-600 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded px-1 py-1 transition-colors duration-200"
          >
            Menu
          </button>

          <div className="hidden md:flex items-center gap-6">
            {mainLinks.slice(1).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={isActive(pathname, href) ? 'page' : undefined}
                className={`text-sm transition-colors duration-200 ${isActive(pathname, href) ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-800'}`}
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
                className="text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}

            <button
              type="button"
              onClick={handleCopyWechat}
              className="text-sm text-gray-400 hover:text-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
            >
              {copyLabel}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 rounded border border-gray-100 bg-white p-4">
            <div className="flex flex-col gap-3">
              {mainLinks.slice(1).map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  aria-current={isActive(pathname, href) ? 'page' : undefined}
                  className={`text-sm transition-colors duration-200 ${isActive(pathname, href) ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {label}
                </Link>
              ))}

              <div className="my-1 h-px bg-gray-100" />

              {socialLinks.map(({ href, label, external }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={closeMenu}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="text-sm text-gray-500 hover:text-gray-800 transition-colors duration-200"
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
                className="text-left text-sm text-gray-500 hover:text-gray-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 rounded"
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
