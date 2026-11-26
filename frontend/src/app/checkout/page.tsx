'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { API_URL } from '../../config/api';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  callback_url: string;
  redirect: boolean;
  prefill: { name: string; email: string; contact: string };
  notes: { address: string; city: string; state: string; pincode: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
  handler: (response: RazorpayResponse) => void;
}

interface RazorpayResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const shipping = 49.99;
  const tax = total * 0.18;
  const grandTotal = total + shipping + tax;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const loadRazorpayScript = () => new Promise<boolean>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  const handlePayment = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill in your name, email, phone and address.');
      return;
    }
    setLoading(true);
    try {
      const loaded = await loadRazorpayScript();
      if (!loaded) throw new Error('Could not load the payment gateway.');
      const orderResponse = await fetch(`${API_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Math.round(grandTotal), currency: 'INR' }),
      });
      const orderData = await orderResponse.json();
      if (!orderResponse.ok || !orderData.success) throw new Error(orderData.message || 'Failed to create payment order.');

      const options: RazorpayOptions = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'RYSE WEARS',
        description: 'Fashion purchase',
        image: '/icon.svg',
        order_id: orderData.order.id,
        callback_url: orderData.callback_url,
        redirect: false,
        prefill: { name: formData.name, email: formData.email, contact: formData.phone },
        notes: { address: formData.address, city: formData.city, state: formData.state, pincode: formData.pincode },
        theme: { color: '#762f3d' },
        modal: { ondismiss: () => setLoading(false) },
        handler: async (payment) => {
          try {
            const verifyResponse = await fetch(`${API_URL}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: payment.razorpay_order_id,
                razorpay_payment_id: payment.razorpay_payment_id,
                razorpay_signature: payment.razorpay_signature,
              }),
            });
            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok || !verifyData.success) throw new Error('Payment verification failed. Please contact support.');
            clearCart();
            window.dispatchEvent(new CustomEvent('order:status', { detail: { status: 'paid', id: verifyData.payment_details?.payment_id || payment.razorpay_payment_id } }));
            router.push('/');
          } catch (error) {
            alert(error instanceof Error ? error.message : 'Payment verification failed.');
          } finally {
            setLoading(false);
          }
        },
      };
      new window.Razorpay(options).open();
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Payment could not be started.');
      setLoading(false);
    }
  };

  const fieldClass = 'mt-2 w-full border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-colors focus:border-[var(--accent)]';
  if (!items.length) return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"><Header />
      <section className="mx-auto max-w-3xl px-5 py-24 text-center"><h1 className="font-display text-3xl font-semibold">Your bag is empty.</h1><p className="mt-3 text-sm text-[var(--muted)]">Add a piece to your bag before checking out.</p><button onClick={() => router.push('/products')} className="mt-7 bg-[var(--accent)] px-7 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[var(--accent-strong)]">Explore the collection</button></section><Footer />
    </main>
  );

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <section className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-14">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">RYSE WEARS / SECURE CHECKOUT</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">Almost yours<span className="text-[var(--accent)]">.</span></h1>
        <p className="mt-3 text-sm text-[var(--muted)]">Add your delivery details to complete your order.</p>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-9">
            <h2 className="font-display text-xl font-semibold">Delivery information</h2>
            <div className="mt-7 space-y-5">
              <label className="block"><span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">Full name *</span><input name="name" autoComplete="name" value={formData.name} onChange={handleInputChange} className={fieldClass} required /></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">Email *</span><input type="email" name="email" autoComplete="email" value={formData.email} onChange={handleInputChange} className={fieldClass} required /></label>
                <label className="block"><span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">Phone *</span><input type="tel" name="phone" autoComplete="tel" value={formData.phone} onChange={handleInputChange} className={fieldClass} required /></label>
              </div>
              <label className="block"><span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">Address *</span><textarea name="address" autoComplete="street-address" rows={3} value={formData.address} onChange={handleInputChange} className={fieldClass} required /></label>
              <div className="grid gap-5 sm:grid-cols-3">
                <label className="block"><span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">City</span><input name="city" autoComplete="address-level2" value={formData.city} onChange={handleInputChange} className={fieldClass} /></label>
                <label className="block"><span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">State</span><input name="state" autoComplete="address-level1" value={formData.state} onChange={handleInputChange} className={fieldClass} /></label>
                <label className="block"><span className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--muted)]">Pincode</span><input name="pincode" autoComplete="postal-code" value={formData.pincode} onChange={handleInputChange} className={fieldClass} /></label>
              </div>
            </div>
          </section>

          <aside className="h-fit border border-[var(--border)] bg-[var(--surface)] p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl font-semibold">Order summary</h2>
            <div className="mt-6 space-y-4 border-b border-[var(--border)] pb-5">
              {items.map((item) => <div key={String(item.id ?? item._id)} className="flex justify-between gap-4 text-xs"><span className="text-[var(--muted)]">{item.name} × {item.quantity}</span><span className="shrink-0 font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span></div>)}
            </div>
            <div className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between text-[var(--muted)]"><span>Subtotal</span><span className="text-[var(--foreground)]">₹{total.toFixed(2)}</span></div>
              <div className="flex justify-between text-[var(--muted)]"><span>Shipping</span><span className="text-[var(--foreground)]">₹{shipping.toFixed(2)}</span></div>
              <div className="flex justify-between text-[var(--muted)]"><span>GST (18%)</span><span className="text-[var(--foreground)]">₹{tax.toFixed(2)}</span></div>
              <div className="flex justify-between border-t border-[var(--border)] pt-4 font-semibold"><span>Total</span><span className="text-[var(--accent)]">₹{grandTotal.toFixed(2)}</span></div>
            </div>
            <button type="button" onClick={handlePayment} disabled={loading} className="mt-7 min-h-12 w-full bg-[var(--accent)] px-5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--accent-strong)] disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Processing…' : 'Pay securely with Razorpay'}</button>
            <p className="mt-4 text-center text-[10px] text-[var(--muted)]">Secure payment powered by Razorpay</p>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
