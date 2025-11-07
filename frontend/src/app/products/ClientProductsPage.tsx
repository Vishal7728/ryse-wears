'use client';

import { useState, useEffect, useCallback } from 'react';
import ProductCard from '../../components/ProductCard';
import { API_URL } from '../../config/api';
import { buildPreferences } from '../../utils/analytics';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category?: string;
  subcategory?: string;
  gender?: string;
  sizes?: string[];
  colors?: string[];
  stock?: number;
}

interface MongoProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  subcategory?: string;
  gender?: string;
  sizes?: string[];
  colors?: string[];
  stock?: number;
}

export default function ClientProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (selectedCategory !== 'All') params.append('subcategory', selectedCategory);
      if (selectedGender !== 'All') params.append('gender', selectedGender);
      if (searchQuery) params.append('search', searchQuery);
      
      const response = await fetch(`${API_URL}/api/products?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Map MongoDB products to frontend format
      const mappedProducts = data.map((product: MongoProduct) => ({
        id: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
        category: product.subcategory || product.category || 'General',
        subcategory: product.subcategory,
        gender: product.gender,
        sizes: product.sizes,
        colors: product.colors,
        stock: product.stock
      }));

      // Behavior-based boost
      const prefs = buildPreferences();
      const scored = mappedProducts
        .map((p: Product) => {
          const cat = p.category?.toLowerCase() || 'general';
          const gender = p.gender || 'Unisex';
          const score = (prefs.categoryScore[cat] || 0) + (prefs.categoryScore[p.subcategory || ''] || 0) + (prefs.genderScore[gender] || 0);
          return { p, score };
        })
        .sort((a: { p: Product; score: number }, b: { p: Product; score: number }) => b.score - a.score)
        .map((s: { p: Product; score: number }) => s.p);

      setProducts(scored);
    } catch (err) {
      console.error('Error fetching products:', err);
      // Use fallback mock data when API fails
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Designer Silk Saree',
          price: 3499,
          description: 'Elegant pure silk saree with intricate embroidery',
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop',
          category: 'Sarees',
          subcategory: 'Sarees',
          gender: 'Women'
        },
        {
          id: '2',
          name: 'Banarasi Silk Saree',
          price: 4999,
          description: 'Traditional Banarasi silk saree with zari work',
          image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=800&h=1000&fit=crop',
          category: 'Sarees',
          subcategory: 'Sarees',
          gender: 'Women'
        },
        {
          id: '3',
          name: 'Anarkali Suit',
          price: 2999,
          description: 'Beautiful Anarkali suit with heavy embroidery',
          image: 'https://images.unsplash.com/photo-1614095851165-d3e4b7e70b85?w=800&h=1000&fit=crop',
          category: 'Suits',
          subcategory: 'Suits',
          gender: 'Women'
        },
        {
          id: '4',
          name: 'Punjabi Suit',
          price: 1899,
          description: 'Vibrant Punjabi suit with phulkari embroidery',
          image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&h=1000&fit=crop',
          category: 'Suits',
          subcategory: 'Suits',
          gender: 'Women'
        },
        {
          id: '5',
          name: 'Lehenga Choli',
          price: 8999,
          description: 'Stunning bridal lehenga choli with mirror work',
          image: 'https://images.unsplash.com/photo-1595341595155-9f8cd95d3e5f?w=800&h=1000&fit=crop',
          category: 'Lehenga',
          subcategory: 'Lehenga',
          gender: 'Women'
        },
        {
          id: '6',
          name: 'Kurta Pajama Set',
          price: 1499,
          description: 'Classic mens kurta pajama in premium cotton',
          image: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388?w=800&h=1000&fit=crop',
          category: 'Kurta',
          subcategory: 'Kurta',
          gender: 'Men'
        },
        {
          id: '7',
          name: 'Sherwani',
          price: 6499,
          description: 'Royal sherwani with intricate embroidery',
          image: 'https://images.unsplash.com/photo-1606219592522-af678b8e0c8e?w=800&h=1000&fit=crop',
          category: 'Sherwani',
          subcategory: 'Sherwani',
          gender: 'Men'
        },
        {
          id: '8',
          name: 'Nehru Jacket',
          price: 2299,
          description: 'Contemporary Nehru jacket with modern cuts',
          image: 'https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=800&h=1000&fit=crop',
          category: 'Jackets',
          subcategory: 'Jackets',
          gender: 'Men'
        }
      ];
      setProducts(mockProducts);
      // setError('Using offline product catalog. Please ensure the backend is running at ' + API_URL + ' to see live inventory. Current API URL: ' + API_URL);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, selectedGender, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = ['All', 'T-Shirts', 'Jeans', 'Shirts', 'Tops', 'Dresses', 'Hoodies', 'Belts', 'Caps'];
  const genders = ['All', 'Men', 'Women', 'Unisex'];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Discover our collection</p>
          </div>
        </div>
        
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
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Discover our collection</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Gender
          </label>
          <select
            id="gender"
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {genders.map((gender) => (
              <option key={gender} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {products.length === 0 && !loading ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={product.id} className="animate-scale-in" style={{animationDelay: `${index * 0.1}s`}}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}