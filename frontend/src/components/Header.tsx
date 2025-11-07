'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [orderToast, setOrderToast] = useState<{ id: string } | null>(null);
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const onOrder = (e: CustomEvent<{ status: string; id: string }>) => {
      if (e?.detail?.status === 'paid') setOrderToast({ id: e.detail.id });
      setTimeout(() => setOrderToast(null), 5000);
    };
    if (typeof window !== 'undefined') {
      const handler = (e: Event) => onOrder(e as CustomEvent<{ status: string; id: string }>);
      window.addEventListener('order:status', handler);
      return () => window.removeEventListener('order:status', handler);
    }
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="stroke-indigo-600 dark:stroke-indigo-400"
                  strokeWidth="3"
                  fill="url(#logo-gradient)"
                />
                
                <path
                  d="M35 30 L35 70 L50 70 L50 50 L60 70 M35 30 L50 30 C55 30 60 35 60 40 C60 45 55 50 50 50 L35 50"
                  className="stroke-white dark:stroke-gray-900"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                
                <defs>
                  <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className="text-indigo-600 dark:text-indigo-500" stopColor="currentColor" />
                    <stop offset="100%" className="text-purple-600 dark:text-purple-400" stopColor="currentColor" />
                  </linearGradient>
                </defs>
              </svg>
              
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 dark:bg-indigo-400/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-white transition-all duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                RYSE Wears
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-sans transition-colors duration-300 group-hover:text-indigo-500 hidden sm:block">
                Elevate Your Style
              </span>
            </div>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <Link href="/" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors font-medium">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors font-medium">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-700 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-gray-300 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Link 
              href="/login" 
              className="hidden sm:block bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 font-medium"
            >
              Sign In
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/about" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/login" 
              className="block w-full text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
      {orderToast && (
        <div className="fixed top-20 right-6 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg z-50">
          Payment successful! ID: {orderToast.id}
        </div>
      )}
    </header>
  );
}