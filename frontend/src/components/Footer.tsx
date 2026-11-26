'use client';

import Link from 'next/link';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Shop all', href: '/products' },
      { label: 'Men', href: '/products?gender=Men' },
      { label: 'Women', href: '/products?gender=Women' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'My account', href: '/login' },
      { label: 'Shopping bag', href: '/cart' },
      { label: 'Contact us', href: '/contact' },
      { label: 'Our story', href: '/about' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#211b1a] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div className="max-w-sm">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="RYSE Wears home">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8b3b4b] text-white"><svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true"><path d="M19 46V17h14c8 0 13 4 13 11 0 5-3 9-8 10l9 8H35l-8-8h-1v8zm7-14h7c4 0 6-1 6-4s-2-4-6-4h-7z" fill="currentColor"/></svg></span>
              <span className="font-display text-xl font-extrabold tracking-[-0.06em]">RYSE WEARS</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">Considered pieces. Confident style. Discover clothing that feels like you.</p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors duration-200 hover:text-white focus-visible:text-white">
                      <span className="relative">{link.label}<span className="absolute -bottom-1 left-0 h-px w-0 bg-[#d6a0a8] transition-all duration-200 group-hover:w-full group-focus-visible:w-full" /></span>
                      <span className="translate-x-[-3px] text-[#d6a0a8] opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Stay in the loop</h2>
            <p className="mt-5 text-sm leading-6 text-white/65">Get collection updates and news from RYSE Wears.</p>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 border-b border-[#c78b95] pb-2 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:text-[#e6b6be]">Get in touch <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-[11px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} RYSE Wears. All rights reserved.</p>
          <p>Designed for everyday self-expression.</p>
        </div>
      </div>
    </footer>
  );
}
