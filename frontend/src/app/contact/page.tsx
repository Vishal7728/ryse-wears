'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '');
    const email = String(form.get('email') || '');
    const subject = String(form.get('subject') || 'Website enquiry');
    const message = String(form.get('message') || '');
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    window.location.href = 'mailto:support@rysewears.com?subject=' + encodeURIComponent(subject) + '&body=' + body;
    setSent(true);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <section className="bg-[#762f3d] px-5 py-16 text-white sm:px-8 sm:py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">We’re here to help</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-6xl lg:text-7xl">Let’s start a <span className="font-normal italic text-[#e8c8cd]">conversation.</span></h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/75 sm:text-base">Questions about an order, a product or RYSE WEARS? Send us a note and we’ll help point you in the right direction.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Contact details</p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.05em]">We’d love to hear from you.</h2>
          <div className="mt-9 space-y-7">
            <div className="border-b border-[var(--border)] pb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Email</p>
              <a href="mailto:support@rysewears.com" className="mt-2 inline-block text-lg font-semibold transition-colors hover:text-[var(--accent)]">support@rysewears.com</a>
            </div>
            <div className="border-b border-[var(--border)] pb-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Phone</p>
              <a href="tel:+917728994624" className="mt-2 inline-block text-lg font-semibold transition-colors hover:text-[var(--accent)]">+91 7728994624</a>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">A quick note</p>
              <p className="mt-2 max-w-sm text-sm leading-7 text-[var(--muted)]">For order-related questions, include your order number in the message so our team can identify the purchase.</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--surface)] p-6 shadow-[0_20px_60px_rgba(35,25,22,0.07)] sm:p-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Send a message</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em]">How can we help?</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">Your name</span>
                <input name="name" required autoComplete="name" className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent)]" placeholder="Name" />
              </label>
              <label className="block">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">Email address</span>
                <input name="email" type="email" required autoComplete="email" className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent)]" placeholder="you@example.com" />
              </label>
            </div>
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">Subject</span>
              <input name="subject" required className="w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent)]" placeholder="What can we help with?" />
            </label>
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">Message</span>
              <textarea name="message" required rows={5} className="w-full resize-y border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm outline-none transition-colors focus:border-[var(--accent)]" placeholder="Tell us a little more..." />
            </label>
            <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center bg-[var(--accent)] px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline-offset-4">Send message <span className="ml-3">↗</span></button>
            {sent && <p role="status" className="text-xs text-[var(--muted)]">Your email app should open with the message details. If it doesn’t, email support@rysewears.com directly.</p>}
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
