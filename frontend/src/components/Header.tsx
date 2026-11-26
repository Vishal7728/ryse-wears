'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

const navigation = [
  { label: 'Shop all', href: '/products' },
  { label: 'Search', href: '/products?search=' },
  { label: 'Men', href: '/products?gender=Men' },
  { label: 'Women', href: '/products?gender=Women' },
  { label: 'Our story', href: '/about' },
];

export default function Header() {
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderToast, setOrderToast] = useState<{ id: string } | null>(null);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<{ status: string; id: string }>).detail;
      if (detail?.status === 'paid') {
        setOrderToast({ id: detail.id });
        window.setTimeout(() => setOrderToast(null), 5000);
      }
    };

    window.addEventListener('order:status', handler);
    return () => window.removeEventListener('order:status', handler);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/95 text-[var(--foreground)] shadow-[0_4px_24px_rgba(35,25,22,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" onClick={closeMenu} className="group flex items-center gap-3" aria-label="RYSE Wears home">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white transition-transform duration-300 group-hover:rotate-[-6deg]">
            <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true"><path d="M19 46V17h14c8 0 13 4 13 11 0 5-3 9-8 10l9 8H35l-8-8h-1v8zm7-14h7c4 0 6-1 6-4s-2-4-6-4h-7z" fill="currentColor"/></svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[19px] font-extrabold tracking-[-0.06em]">RYSE WEARS</span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Elevate your style</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--foreground)]/75 transition-colors duration-200 hover:text-[var(--accent)] focus-visible:text-[var(--accent)]"
            >
              {item.label}<span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--accent)] transition-all duration-200 group-hover:w-full group-focus-visible:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="group relative hidden px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--foreground)]/75 transition-colors hover:text-[var(--accent)] lg:inline-flex"
          >
            Contact<span className="absolute bottom-0 left-3 h-px w-0 bg-[var(--accent)] transition-all group-hover:w-[calc(100%-24px)]" />
          </Link>
          <Link
            href="/login"
            className="hidden rounded-full border border-[var(--border)] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.13em] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] sm:inline-flex"
          >
            Sign in
          </Link>
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[var(--accent-soft)]"
            aria-label={cartItemCount > 0 ? 'Shopping bag, ' + cartItemCount + ' items' : 'Shopping bag'}
          >
            <svg className="h-[19px] w-[19px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14l1 13H4L5 8Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V6a3 3 0 0 1 6 0v3" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[var(--accent-soft)] md:hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M18 6 6 18" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-xs font-bold uppercase tracking-[0.13em] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={closeMenu} className="rounded-lg px-3 py-3 text-xs font-bold uppercase tracking-[0.13em] hover:bg-[var(--accent-soft)]">
              Contact
            </Link>
            <Link href="/login" onClick={closeMenu} className="mt-2 rounded-full bg-[var(--accent)] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.13em] text-white">
              Sign in
            </Link>
          </div>
        </nav>
      )}

      {orderToast && (
        <div role="status" className="fixed right-5 top-24 z-[60] rounded-xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white shadow-xl">
          Payment successful. Order ID: {orderToast.id}
        </div>
      )}
    </header>
  );
}
