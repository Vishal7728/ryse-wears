'use client';

import { useCart } from '../context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: number | string;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="group">
      <div className="relative overflow-hidden bg-[#eeeae6] dark:bg-[#302927]">
        <Link href={`/products/${product.id}`} className="block" aria-label={`View ${product.name}`}>
          <div className="relative w-full" style={{ paddingTop: '128%' }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
              loading="lazy"
              unoptimized={product.image.startsWith('http')}
              quality={72}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>
        <span className="absolute left-3 top-3 bg-white/90 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#4c3938] backdrop-blur">
          {product.category || 'Selected'}
        </span>
        <button
          type="button"
          onClick={() => addItem(product)}
          className="absolute bottom-3 left-3 right-3 translate-y-2 bg-white px-3 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[#211b1a] opacity-0 transition-all duration-300 hover:bg-[#762f3d] hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
          aria-label={`Add ${product.name} to shopping bag`}
        >
          Add to bag
        </button>
      </div>
      <div className="flex items-start justify-between gap-3 pt-3">
        <div className="min-w-0">
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="line-clamp-2 text-sm font-semibold tracking-[-0.02em] text-[var(--foreground)] transition-colors group-hover:text-[var(--accent)]">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">{product.category || 'RYSE collection'}</p>
        </div>
        <span className="shrink-0 pt-0.5 text-sm font-bold text-[var(--foreground)]">₹{Number(product.price).toLocaleString('en-IN')}</span>
      </div>
      <button
        type="button"
        onClick={() => addItem(product)}
        className="mt-3 w-full border border-[var(--border)] py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white sm:hidden"
      >
        Add to bag
      </button>
    </article>
  );
}
