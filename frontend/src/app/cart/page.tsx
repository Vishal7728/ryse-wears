'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();
  const shipping = 49.99;
  const tax = total * 0.18;
  const grandTotal = total + shipping + tax;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <section className="mx-auto min-h-[440px] max-w-[1280px] px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">RYSE WEARS / YOUR BAG</p>
        <div className="mb-8 mt-3 flex flex-wrap items-end justify-between gap-4">
          <div><h1 className="font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Your bag<span className="text-[var(--accent)]">.</span></h1><p className="mt-2 text-sm text-[var(--muted)]">{items.length} {items.length === 1 ? 'piece' : 'pieces'} in your bag</p></div>
          <Link href="/products" className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]">Continue shopping ↗</Link>
        </div>

        {items.length === 0 ? (
          <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)] text-2xl text-[var(--accent)]">R</div>
            <h2 className="mt-5 font-display text-2xl font-semibold">Your bag is waiting.</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Explore the collection and find something that feels like you.</p>
            <Link href="/products" className="mt-7 inline-flex min-h-12 items-center bg-[var(--accent)] px-7 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[var(--accent-strong)]">Explore the collection</Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-3">
              {items.map((item) => {
                const itemId = item.id ?? item._id ?? '';
                return (
                  <article key={String(itemId)} className="flex gap-4 border border-[var(--border)] bg-[var(--surface)] p-4 sm:gap-6 sm:p-5">
                    <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-[#eee9e4] sm:h-36 sm:w-28">
                      <Image src={item.image} alt={item.name} fill unoptimized={item.image.startsWith('http')} sizes="112px" className="object-cover" quality={70} />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between gap-4">
                      <div className="flex flex-wrap justify-between gap-3">
                        <div className="min-w-0"><h2 className="font-display text-base font-semibold">{item.name}</h2><p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--muted)]">{item.description}</p></div>
                        <p className="shrink-0 text-sm font-semibold text-[var(--accent)]">₹{Number(item.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center border border-[var(--border)]">
                          <button type="button" onClick={() => updateQuantity(itemId, Math.max(1, item.quantity - 1))} disabled={item.quantity <= 1} className="h-9 w-9 transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)] disabled:opacity-40" aria-label={`Decrease ${item.name} quantity`}>−</button>
                          <span className="w-9 text-center text-xs font-semibold">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(itemId, item.quantity + 1)} className="h-9 w-9 transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]" aria-label={`Increase ${item.name} quantity`}>+</button>
                        </div>
                        <button type="button" onClick={() => removeItem(itemId)} className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]">Remove</button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="h-fit border border-[var(--border)] bg-[var(--surface)] p-6 lg:sticky lg:top-28">
              <h2 className="font-display text-xl font-semibold">Order summary</h2>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between text-[var(--muted)]"><span>Subtotal</span><span className="text-[var(--foreground)]">₹{total.toFixed(2)}</span></div>
                <div className="flex justify-between text-[var(--muted)]"><span>Shipping</span><span className="text-[var(--foreground)]">₹{shipping.toFixed(2)}</span></div>
                <div className="flex justify-between text-[var(--muted)]"><span>GST (18%)</span><span className="text-[var(--foreground)]">₹{tax.toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-[var(--border)] pt-4 font-semibold"><span>Total</span><span className="text-[var(--accent)]">₹{grandTotal.toFixed(2)}</span></div>
              </div>
              <Link href="/checkout" className="mt-7 flex min-h-12 items-center justify-center bg-[var(--accent)] px-5 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--accent-strong)]">Proceed to checkout ↗</Link>
              <p className="mt-4 text-center text-[10px] leading-5 text-[var(--muted)]">Shipping and taxes are calculated at checkout.</p>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
