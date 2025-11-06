'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { API_URL } from '../../config/api';
import { recordEvent, buildPreferences } from '../../utils/analytics';

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

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addItem } = useCart();

  // Initialize filters from URL parameters
  useEffect(() => {
    const genderParam = searchParams.get('gender');
    if (genderParam && ['Men', 'Women', 'Unisex'].includes(genderParam)) {
      setSelectedGender(genderParam);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedGender, searchQuery]);

  const fetchProducts = async () => {
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
      
      // Define MongoDB product type
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
          image: 'https://placehold.co/600x800/red/white?text=Designer+Silk+Saree',
          category: 'Sarees',
          subcategory: 'Sarees',
          gender: 'Women'
        },
        {
          id: '2',
          name: 'Banarasi Silk Saree',
          price: 4999,
          description: 'Traditional Banarasi silk saree with zari work',
          image: 'https://placehold.co/600x800/0000FF/white?text=Banarasi+Silk+Saree',
          category: 'Sarees',
          subcategory: 'Sarees',
          gender: 'Women'
        },
        {
          id: '3',
          name: 'Anarkali Suit',
          price: 2999,
          description: 'Beautiful Anarkali suit with heavy embroidery',
          image: 'https://placehold.co/600x800/FF1493/white?text=Anarkali+Suit',
          category: 'Suits',
          subcategory: 'Suits',
          gender: 'Women'
        },
        {
          id: '4',
          name: 'Punjabi Suit',
          price: 1899,
          description: 'Vibrant Punjabi suit with phulkari embroidery',
          image: 'https://placehold.co/600x800/FFD700/black?text=Punjabi+Suit',
          category: 'Suits',
          subcategory: 'Suits',
          gender: 'Women'
        },
        {
          id: '5',
          name: 'Lehenga Choli',
          price: 8999,
          description: 'Stunning bridal lehenga choli with mirror work',
          image: 'https://placehold.co/600x800/8B0000/white?text=Lehenga+Choli',
          category: 'Lehenga',
          subcategory: 'Lehenga',
          gender: 'Women'
        },
        {
          id: '6',
          name: 'Kurta Pajama Set',
          price: 1499,
          description: 'Classic mens kurta pajama in premium cotton',
          image: 'https://placehold.co/600x800/F5F5DC/black?text=Kurta+Pajama',
          category: 'Kurta',
          subcategory: 'Kurta',
          gender: 'Men'
        },
        {
          id: '7',
          name: 'Sherwani',
          price: 6499,
          description: 'Royal sherwani with intricate embroidery',
          image: 'https://placehold.co/600x800/DAA520/white?text=Sherwani',
          category: 'Sherwani',
          subcategory: 'Sherwani',
          gender: 'Men'
        },
        {
          id: '8',
          name: 'Nehru Jacket',
          price: 2299,
          description: 'Contemporary Nehru jacket with modern cuts',
          image: 'https://placehold.co/600x800/000000/white?text=Nehru+Jacket',
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
  };

  const categories = ['All', 'T-Shirts', 'Jeans', 'Shirts', 'Tops', 'Dresses', 'Hoodies', 'Belts', 'Caps'];
  const genders = ['All', 'Men', 'Women', 'Unisex'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Header />
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-xl text-gray-900 dark:text-white mt-4">Loading products...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
      <Header />

      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-yellow-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white dark:bg-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); recordEvent('search', { query: e.target.value }); }}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-slate-700 dark:text-white"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); recordEvent('filter_change', { type: 'category', value: cat }); }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            {/* Gender Filter */}
            <div className="flex gap-2">
              {genders.map((gender) => (
                <button
                  key={gender}
                  onClick={() => { setSelectedGender(gender); recordEvent('filter_change', { type: 'gender', value: gender }); }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedGender === gender
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                      : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white">Our Collection</h2>
          <p className="text-gray-600 dark:text-gray-400">{products.length} Products</p>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400">No products found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="animate-fade-in">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}