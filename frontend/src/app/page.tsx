'use client';

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from 'react';
import { API_URL } from '../config/api';

interface FeaturedProduct {
  id: number | string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface MongoProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  subcategory?: string;
}

const banners = [
  {
    title: "New Collection",
    description: "Discover the latest trends in fashion with our exclusive collection. Elevate your style today.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80",
    buttonPrimary: "Shop Now",
    buttonSecondary: "Learn More",
    textColor: "text-white",
    buttonPrimaryBg: "bg-white text-gray-900 hover:bg-gray-100",
    buttonSecondaryBg: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
  },
  {
    title: "Summer Sale",
    description: "Get up to 50% off on selected items. Limited time offer. Don't miss out!",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80",
    buttonPrimary: "Shop Sale",
    buttonSecondary: "View All",
    textColor: "text-white",
    buttonPrimaryBg: "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:from-orange-600 hover:to-pink-600",
    buttonSecondaryBg: "bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-orange-600"
  },
  {
    title: "Premium Quality",
    description: "Handpicked designs crafted with finest materials. Experience luxury fashion.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b??w=1920&q=80",
    buttonPrimary: "Explore",
    buttonSecondary: "About Us",
    textColor: "text-white",
    buttonPrimaryBg: "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600",
    buttonSecondaryBg: "bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-teal-600"
  },
  {
    title: "Trending Now",
    description: "Stay ahead with the hottest styles of the season. Fashion that speaks volumes.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1920&q=80",
    buttonPrimary: "See Trends",
    buttonSecondary: "Collections",
    textColor: "text-white",
    buttonPrimaryBg: "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600",
    buttonSecondaryBg: "bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-purple-600"
  }
];

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      
      // Filter Indian traditional wear first, then other products
      const traditionalWear = data.filter((p: MongoProduct) => p.category === 'Traditional');
      const otherProducts = data.filter((p: MongoProduct) => p.category !== 'Traditional');
      
      // Combine: prioritize traditional wear (max 6) + other products (fill remaining)
      const featured = [
        ...traditionalWear.slice(0, 6),
        ...otherProducts.slice(0, 8 - Math.min(6, traditionalWear.length))
      ].slice(0, 8);
      
      const products = featured.map((product: MongoProduct) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.subcategory || product.category || 'General'
      }));
      
      setFeaturedProducts(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to mock data if API fails
      setFeaturedProducts([
        {
          id: 1,
          name: 'Summer T-Shirt',
          price: 599,
          description: 'Comfortable cotton fabric',
          image: '/vercel.svg',
          category: 'Tops'
        },
        {
          id: 2,
          name: 'Designer Jeans',
          price: 1899,
          description: 'Slim fit premium denim',
          image: '/vercel.svg',
          category: 'Bottoms'
        },
        {
          id: 3,
          name: 'Casual Hoodie',
          price: 1499,
          description: 'Soft fleece material',
          image: '/vercel.svg',
          category: 'Tops'
        },
        {
          id: 4,
          name: 'Summer Shorts',
          price: 799,
          description: 'Lightweight and comfortable',
          image: '/vercel.svg',
          category: 'Bottoms'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors page-transition">
      <Header />

      {/* Flash Deal Marquee Bar */}
      <div className="bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white py-3 overflow-hidden relative">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%] animate-shimmer"></div>
        <div className="relative flex items-center">
          <span className="inline-flex items-center px-4 py-1 bg-yellow-400 text-red-900 font-bold text-sm rounded-full mr-4 ml-4 animate-pulse">
            🔥 FLASH DEAL
          </span>
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="mx-8 text-lg font-bold">⚡ UP TO 70% OFF on Western Wear!</span>
            <span className="mx-8 text-lg font-bold">🎉 Limited Time: Premium Blazers ₹1,999 (Save ₹3,000)</span>
            <span className="mx-8 text-lg font-bold">💥 Denim Jackets ₹999 Only - Hurry!</span>
            <span className="mx-8 text-lg font-bold">🔥 Buy 2 Get 1 FREE on All Shirts</span>
            <span className="mx-8 text-lg font-bold">⏰ Flash Sale Ends in 6 Hours!</span>
            <span className="mx-8 text-lg font-bold">🛍️ Free Shipping on Orders Above ₹1,500</span>
            {/* Duplicate for seamless loop */}
            <span className="mx-8 text-lg font-bold">⚡ UP TO 70% OFF on Western Wear!</span>
            <span className="mx-8 text-lg font-bold">🎉 Limited Time: Premium Blazers ₹1,999 (Save ₹3,000)</span>
            <span className="mx-8 text-lg font-bold">💥 Denim Jackets ₹999 Only - Hurry!</span>
            <span className="mx-8 text-lg font-bold">🔥 Buy 2 Get 1 FREE on All Shirts</span>
            <span className="mx-8 text-lg font-bold">⏰ Flash Sale Ends in 6 Hours!</span>
            <span className="mx-8 text-lg font-bold">🛍️ Free Shipping on Orders Above ₹1,500</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Full Viewport Banner with Auto-Change */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${banners[currentBanner].image})`,
          }}
        >
          {/* Dark Overlay for text contrast */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Animated Pattern Overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTEyIDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 key={`title-${currentBanner}`} className={`text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight mb-6 animate-fade-in ${banners[currentBanner].textColor} drop-shadow-2xl`}>
              {banners[currentBanner].title}
            </h1>
            <p key={`desc-${currentBanner}`} className={`mt-6 max-w-3xl mx-auto text-xl sm:text-2xl lg:text-3xl font-sans leading-relaxed animate-fade-in ${banners[currentBanner].textColor} drop-shadow-lg`} style={{animationDelay: '0.2s'}}>
              {banners[currentBanner].description}
            </p>
            <div key={`buttons-${currentBanner}`} className="mt-12 flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Link
                href="/products"
                className={`inline-block px-10 py-5 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 ${banners[currentBanner].buttonPrimaryBg}`}
              >
                {banners[currentBanner].buttonPrimary}
              </Link>
              <Link
                href="/about"
                className={`inline-block px-10 py-5 rounded-xl text-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${banners[currentBanner].buttonSecondaryBg}`}
              >
                {banners[currentBanner].buttonSecondary}
              </Link>
            </div>
            
            {/* Banner Indicators */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    index === currentBanner 
                      ? 'bg-white w-8' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white animate-fade-in">Indian Traditional Wear</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Celebrate Indian heritage with our exclusive collection</p>
          </div>
          <Link 
            href="/products"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors duration-300"
          >
            View All →
          </Link>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300 dark:bg-slate-700"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-slate-800 py-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="h-12 w-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-300 font-sans">All products are crafted with the finest materials</p>
            </div>
            <div className="text-center group animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="h-12 w-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">Free Shipping</h3>
              <p className="text-gray-600 dark:text-gray-300 font-sans">On orders over ₹2000 across India</p>
            </div>
            <div className="text-center group animate-fade-in" style={{animationDelay: '0.6s'}}>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                  <svg className="h-12 w-12 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">Easy Returns</h3>
              <p className="text-gray-600 dark:text-gray-300 font-sans">30-day return policy on all items</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Fashion Models Showcase */}
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">Virtual Fashion Models</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">Experience our latest collection on AI-generated 3D models. Rotate, zoom, and explore every detail.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Male Model */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
              <div className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600">
                <h3 className="text-2xl font-bold text-white mb-2">Men&apos;s Collection</h3>
                <p className="text-white/90">Premium Western Fashion</p>
              </div>
              <div className="relative" style={{ height: '500px' }}>
                <img
                  src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80"
                  alt="Male Fashion Model - Men's Western Wear"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h4 className="text-white text-xl font-bold mb-2">Latest Men&apos;s Styles</h4>
                    <p className="text-white/90 mb-4">Denim Jackets • Blazers • Chinos • Premium Shirts</p>
                    <Link href="/products" className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Shop Men&apos;s Collection
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-4">
                  <div className="flex-1 text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">50+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Styles</p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">New</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Arrivals</p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">30%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Off Sale</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Female Model */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
              <div className="p-6 bg-gradient-to-r from-pink-500 to-purple-600">
                <h3 className="text-2xl font-bold text-white mb-2">Women&apos;s Collection</h3>
                <p className="text-white/90">Elegant Western Fashion</p>
              </div>
              <div className="relative" style={{ height: '500px' }}>
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                  alt="Female Fashion Model - Women's Western Wear"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h4 className="text-white text-xl font-bold mb-2">Latest Women&apos;s Styles</h4>
                    <p className="text-white/90 mb-4">Dresses • Tops • Jeans • Elegant Blazers</p>
                    <Link href="/products" className="inline-block bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      Shop Women&apos;s Collection
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex gap-4">
                  <div className="flex-1 text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">60+</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Styles</p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">Hot</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Trends</p>
                  </div>
                  <div className="flex-1 text-center p-3 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">40%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Off Sale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Below Models */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <div className="w-12 h-12 mx-auto mb-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Realistic Preview</h3>
              <p className="text-gray-600 dark:text-gray-400">See how clothes fit and look from every angle</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <div className="w-12 h-12 mx-auto mb-4 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Style Matching</h3>
              <p className="text-gray-600 dark:text-gray-400">AI-powered recommendations for your body type</p>
            </div>
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Quick Updates</h3>
              <p className="text-gray-600 dark:text-gray-400">New styles added weekly to our collection</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
