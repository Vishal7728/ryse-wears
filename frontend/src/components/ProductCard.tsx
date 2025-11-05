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
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover-lift group">
      <Link href={`/products/${product.id}`} className="block">
        <div className="h-48 sm:h-56 md:h-64 bg-gray-200 dark:bg-slate-700 relative overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </Link>
      <div className="p-4">
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide font-sans transform inline-block group-hover:scale-105 transition-transform duration-300">
          {product.category || 'General'}
        </span>
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 cursor-pointer">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-sans">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900 dark:text-white transform group-hover:scale-110 transition-transform duration-300 inline-block">₹{product.price.toFixed(2)}</span>
          <button 
            onClick={() => addItem(product)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-110 hover:shadow-xl active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}