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
    <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover-lift group dark:border dark:border-purple-500/20 relative transition-all duration-300">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-cyan-500/10 opacity-0 dark:group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
      
      <Link href={`/products/${product.id}`} className="block relative z-10">
        <div className="relative bg-gray-200 dark:bg-slate-700/50 overflow-hidden">
          <div className="relative w-full" style={{ paddingTop: '125%' }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              unoptimized
              loading="lazy"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </Link>
      <div className="p-4 relative z-10">
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide font-sans">
          {product.category || 'General'}
        </span>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mt-1 line-clamp-2">{product.name}</h3>
        </Link>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price.toFixed(2)}</span>
          <button 
            onClick={() => addItem(product)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}