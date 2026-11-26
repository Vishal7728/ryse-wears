'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const principles = [
  { number: '01', title: 'Thoughtful materials', text: 'We look for fabrics and finishes that feel considered, comfortable and made to be worn often.' },
  { number: '02', title: 'Everyday versatility', text: 'Pieces should work across plans, seasons and personal styles — not just for one moment.' },
  { number: '03', title: 'A lasting point of view', text: 'We favour confident, wearable design over noise and passing trends.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <section className="relative isolate overflow-hidden bg-[#251d1d] text-white">
        <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2200&q=90" alt="Fashion studio and clothing rails" fill unoptimized priority sizes="100vw" className="object-cover opacity-45" />
        <div className="relative mx-auto flex min-h-[440px] max-w-[1440px] items-end px-6 pb-14 pt-24 sm:px-10 lg:min-h-[560px] lg:px-16 lg:pb-20">
          <div className="max-w-3xl">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.24em] text-white/70">The RYSE point of view</p>
            <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-8xl">Wear what<br /><span className="font-normal italic text-[#e4bdc3]">moves you.</span></h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/80 sm:text-base">RYSE Wears is built around personal expression, versatile pieces and the confidence to make a look your own.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Our story</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.055em] sm:text-5xl">Style should feel like <span className="font-normal italic text-[var(--accent)]">your own.</span></h2>
        </div>
        <div className="space-y-5 text-sm leading-8 text-[var(--muted)] sm:text-base">
          <p>Founded in 2025, RYSE Wears began with a simple idea: clothing should help people express their individuality and feel comfortable in their own style.</p>
          <p>Our approach brings together contemporary silhouettes, wearable essentials and details that make an outfit feel considered. We want getting dressed to feel less complicated and more personal.</p>
          <p>We continue to explore responsible material choices and thoughtful production as we grow. Our focus is on building a collection people can return to, style in different ways and make their own.</p>
          <Link href="/products" className="mt-3 inline-flex items-center gap-3 border-b border-[var(--accent)] pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)] transition-colors hover:border-[var(--accent-strong)] hover:text-[var(--accent-strong)]">Explore the collection <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="bg-[#f0ece7] dark:bg-[#211e1c]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-[600px]">
            <Image src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=90" alt="Creative team working together" fill unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Behind the label</p>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Made for real life.</h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[var(--muted)]">From the first outfit idea to the final details, we think about how clothing fits into everyday routines. The result is a growing edit of pieces designed to be mixed, matched and worn your way.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="mb-10 max-w-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">What guides us</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">The RYSE essentials.</h2>
        </div>
        <div className="grid gap-8 border-y border-[var(--border)] py-9 md:grid-cols-3 md:gap-10">
          {principles.map((item) => (
            <article key={item.number}>
              <span className="text-[10px] font-bold tracking-[0.16em] text-[var(--accent)]">{item.number}</span>
              <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.035em]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#762f3d] px-5 py-16 text-center text-white sm:py-20">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">Find your next favourite</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Make the everyday yours.</h2>
        <Link href="/products" className="mt-8 inline-flex min-h-12 items-center justify-center border border-white/75 px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#762f3d]">Shop RYSE WEARS <span className="ml-3">↗</span></Link>
      </section>
      <Footer />
    </main>
  );
}
