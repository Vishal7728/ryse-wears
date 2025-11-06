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
    <div className="bg-white dark:bg-slate-800/50 dark:backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover-lift group dark:border dark:border-purple-500/20 relative">
      {/* Glowing border effect in dark mode */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <Link href={`/products/${product.id}`} className="block relative z-10">
        <div className="relative bg-gray-200 dark:bg-slate-700/50 overflow-hidden">
          <div className="relative w-full" style={{ paddingTop: '133%' }}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
            unoptimized
          />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          {/* RGB glow overlay in dark mode */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 dark:group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </Link>
      <div className="p-4 relative z-10">
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide font-sans transform inline-block group-hover:scale-105 transition-transform duration-300">
          {product.category || 'General'}
        </span>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 cursor-pointer">{product.name}</h3>
        </Link>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white transform group-hover:scale-110 transition-transform duration-300 inline-block">₹{product.price.toFixed(2)}</span>
          <button 
            onClick={() => addItem(product)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-110 hover:shadow-xl dark:hover:shadow-purple-500/50 active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}