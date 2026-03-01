'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigationLinks, profile, socialLinks, wechatId } from '@/lib/data';

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [wechatCopyLabel, setWechatCopyLabel] = useState('WeChat');
  const [emailCopyLabel, setEmailCopyLabel] = useState('Email');
  const mobileMenuId = 'mobile-primary-menu';

  const mainLinks = useMemo(() => navigationLinks, []);
  const emailLink = useMemo(
    () => socialLinks.find((item) => item.label.toLowerCase() === 'email')?.href ?? '',
    []
  );

  function extractEmailAddress(emailHref: string) {
    if (!emailHref) {
      return '';
    }
    if (emailHref.startsWith('mailto:')) {
      return emailHref.replace('mailto:', '').trim();
    }
    return emailHref.trim();
  }

  async function copyWithFeedback(value: string, setLabel: (value: string) => void, defaultLabel: string) {
    if (!value) {
      setLabel('Failed');
      setTimeout(() => setLabel(defaultLabel), 1200);
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setLabel('Copied');
      setTimeout(() => setLabel(defaultLabel), 1200);
    } catch {
      setLabel('Failed');
      setTimeout(() => setLabel(defaultLabel), 1200);
    }
  }

  async function handleCopyWechat() {
    await copyWithFeedback(wechatId, setWechatCopyLabel, 'WeChat');
  }

  async function handleCopyEmail() {
    await copyWithFeedback(extractEmailAddress(emailLink), setEmailCopyLabel, 'Email');
  }

  function closeMenu() {
    setIsOpen(false);
  }

  function SocialIcon({ label }: { label: string }) {
    const iconClassName = 'h-5 w-5';
    const normalizedLabel = label.toLowerCase();

    if (normalizedLabel === 'github') {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.86-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.58 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.72.12 2.52.36 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.95-2.34 4.82-4.57 5.08.36.32.69.95.69 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.5A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2" />
        </svg>
      );
    }

    if (normalizedLabel === 'linkedin') {
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={iconClassName}>
          <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.4 15.5v-5.3c0-2.6-1.38-3.8-3.22-3.8-1.48 0-2.14.81-2.5 1.38v-1.18H10.2c.03.78 0 8.9 0 8.9h2.68v-4.97c0-.26.02-.53.1-.72.2-.53.66-1.07 1.43-1.07 1.01 0 1.41.8 1.41 1.98v4.78zM7.37 8.5A1.56 1.56 0 1 0 7.33 5.4a1.56 1.56 0 0 0 .04 3.1m1.33 10V9.6H6.03v8.9z" />
        </svg>
      );
    }

    if (normalizedLabel === 'email') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={iconClassName}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5v9A1.5 1.5 0 0 1 18.5 18h-13A1.5 1.5 0 0 1 4 16.5zm0 .2 8 5.3 8-5.3" />
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={iconClassName}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-7.5-7.5v15" />
      </svg>
    );
  }

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 z-20 w-full border-b border-warm-300/20 bg-gradient-to-b from-warm-100 to-warm-50/0 py-4 backdrop-blur-[2px]"
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              aria-current={pathname === '/' ? 'page' : undefined}
              className="hidden lg:block text-2xl font-semibold text-ink-900"
            >
              {profile.name}
            </Link>

            <div className="hidden lg:flex items-center gap-6 text-base text-ink-700">
              {mainLinks.slice(1).map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(pathname, href) ? 'page' : undefined}
                  className={`transition-colors duration-200 ${isActive(pathname, href) ? 'text-ink-900 underline underline-offset-4 decoration-sage-500' : 'hover:text-ink-900'}`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls={mobileMenuId}
            onClick={() => setIsOpen((open) => !open)}
            className="lg:hidden text-sm font-medium text-ink-600 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300 rounded px-2 py-1 transition-colors duration-200"
          >
            Menu
          </button>

          <div className="hidden lg:flex items-center gap-2 border-l border-warm-300/40 pl-4 text-ink-700">
            {socialLinks.map(({ href, label, external }) => {
              if (label.toLowerCase() === 'email') {
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={emailCopyLabel === 'Email' ? 'Copy email' : emailCopyLabel}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-warm-200/60 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300"
                  >
                    <SocialIcon label={label} />
                  </button>
                );
              }

              return (
                <Link
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-warm-200/60 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300"
                >
                  <SocialIcon label={label} />
                </Link>
              );
            })}

            <button
              type="button"
              onClick={handleCopyWechat}
              aria-label={wechatCopyLabel === 'WeChat' ? 'Copy WeChat ID' : wechatCopyLabel}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200 hover:bg-warm-200/60 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                <path d="M8.3 5.5c-3.37 0-6.1 2.4-6.1 5.36 0 1.71.94 3.24 2.4 4.22l-.6 2.39 2.56-1.42c.58.1 1.17.16 1.74.16 3.37 0 6.1-2.4 6.1-5.35 0-2.96-2.73-5.36-6.1-5.36m-2.02 4.41a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56m4.05 0a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56M15.8 8.23c-3.3 0-5.98 2.3-5.98 5.15s2.68 5.15 5.99 5.15c.56 0 1.12-.07 1.65-.2l2.43 1.34-.57-2.24c1.43-.96 2.32-2.42 2.32-4.05 0-2.85-2.68-5.15-5.98-5.15m-1.93 4.23a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m3.87 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5" />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            id={mobileMenuId}
            className="lg:hidden mt-4 rounded-xl border border-warm-300/80 bg-warm-50/95 shadow-lg shadow-warm-200/60 p-4"
          >
            <div className="flex flex-col gap-3">
              {mainLinks.slice(1).map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={closeMenu}
                  aria-current={isActive(pathname, href) ? 'page' : undefined}
                  className={`text-sm transition-colors duration-200 ${isActive(pathname, href) ? 'text-ink-900 font-medium' : 'text-ink-600 hover:text-ink-900'}`}
                >
                  {label}
                </Link>
              ))}

              <div className="my-1 h-px bg-warm-200" />

              <div className="flex items-center gap-3">
                {socialLinks.map(({ href, label, external }) => {
                  if (label.toLowerCase() === 'email') {
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={async () => {
                          closeMenu();
                          await handleCopyEmail();
                        }}
                        aria-label={emailCopyLabel === 'Email' ? 'Copy email' : emailCopyLabel}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warm-300/70 text-ink-600 transition-colors duration-200 hover:bg-warm-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300"
                      >
                        <SocialIcon label={label} />
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={label}
                      href={href}
                      onClick={closeMenu}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noreferrer' : undefined}
                      aria-label={label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warm-300/70 text-ink-600 transition-colors duration-200 hover:bg-warm-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300"
                    >
                      <SocialIcon label={label} />
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onClick={async () => {
                    closeMenu();
                    await handleCopyWechat();
                  }}
                  aria-label={wechatCopyLabel === 'WeChat' ? 'Copy WeChat ID' : wechatCopyLabel}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-warm-300/70 text-ink-600 transition-colors duration-200 hover:bg-warm-100 hover:text-ink-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-300"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                    <path d="M8.3 5.5c-3.37 0-6.1 2.4-6.1 5.36 0 1.71.94 3.24 2.4 4.22l-.6 2.39 2.56-1.42c.58.1 1.17.16 1.74.16 3.37 0 6.1-2.4 6.1-5.35 0-2.96-2.73-5.36-6.1-5.36m-2.02 4.41a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56m4.05 0a.78.78 0 1 1 0 1.56.78.78 0 0 1 0-1.56M15.8 8.23c-3.3 0-5.98 2.3-5.98 5.15s2.68 5.15 5.99 5.15c.56 0 1.12-.07 1.65-.2l2.43 1.34-.57-2.24c1.43-.96 2.32-2.42 2.32-4.05 0-2.85-2.68-5.15-5.98-5.15m-1.93 4.23a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m3.87 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
