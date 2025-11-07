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
      
      // Add limit for better performance
      params.append('limit', '20');
      
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
      
      // Handle both old and new API response formats
      const productsData = data.products || data;
      
      // Map MongoDB products to frontend format
      const mappedProducts = productsData.map((product: MongoProduct) => ({
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

      setProducts(mappedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      // Use fallback mock data when API fails
      const mockProducts: Product[] = [
        // Male Products (8 items for better performance)
        {
          id: '1',
          name: 'Classic White T-Shirt',
          price: 799,
          description: 'Premium cotton crew neck t-shirt, perfect for everyday wear. Soft fabric and comfortable fit.',
          image: '/images/products/male/classic-white-tshirt.jpg',
          category: 'Tops',
          subcategory: 'T-Shirts',
          gender: 'Men'
        },
        {
          id: '2',
          name: 'Slim Fit Jeans',
          price: 1899,
          description: 'Modern slim fit jeans with stretch fabric for comfort. Classic blue denim with five-pocket styling.',
          image: '/images/products/male/slim-fit-jeans.jpg',
          category: 'Bottoms',
          subcategory: 'Jeans',
          gender: 'Men'
        },
        {
          id: '3',
          name: 'Black Leather Jacket',
          price: 4999,
          description: 'Genuine leather biker jacket with quilted lining. Classic moto style with zippered pockets.',
          image: '/images/products/male/black-leather-jacket.jpg',
          category: 'Outerwear',
          subcategory: 'Jackets',
          gender: 'Men'
        },
        {
          id: '4',
          name: 'Casual Plaid Shirt',
          price: 1299,
          description: 'Soft cotton flannel shirt with classic plaid pattern. Button-down style with chest pocket.',
          image: '/images/products/male/casual-plaid-shirt.jpg',
          category: 'Tops',
          subcategory: 'Shirts',
          gender: 'Men'
        },
        {
          id: '5',
          name: 'Navy Blue Chinos',
          price: 1599,
          description: 'Slim fit chino pants in classic navy blue. Made from premium cotton twill with belt loops.',
          image: '/images/products/male/navy-blue-chinos.jpg',
          category: 'Bottoms',
          subcategory: 'Chinos',
          gender: 'Men'
        },
        {
          id: '6',
          name: 'Hooded Sweatshirt',
          price: 1399,
          description: 'Comfortable hoodie with kangaroo pocket and adjustable drawstring hood. Perfect for casual wear.',
          image: '/images/products/male/hooded-sweatshirt.jpg',
          category: 'Outerwear',
          subcategory: 'Hoodies',
          gender: 'Men'
        },
        {
          id: '7',
          name: 'Polo Shirt',
          price: 999,
          description: 'Classic polo shirt with ribbed collar and button placket. Made from breathable cotton pique.',
          image: '/images/products/male/polo-shirt.jpg',
          category: 'Tops',
          subcategory: 'Polo',
          gender: 'Men'
        },
        {
          id: '8',
          name: 'Cargo Pants',
          price: 1799,
          description: 'Tactical cargo pants with multiple utility pockets. Durable cotton blend with relaxed fit.',
          image: '/images/products/male/cargo-pants.jpg',
          category: 'Bottoms',
          subcategory: 'Pants',
          gender: 'Men'
        },
        
        // Female Products (8 items)
        {
          id: '9',
          name: 'Off-Shoulder Top',
          price: 1199,
          description: 'Trendy off-shoulder top with elastic neckline. Perfect for date nights and summer events.',
          image: '/images/products/female/off-shoulder-top.jpg',
          category: 'Tops',
          subcategory: 'Blouses',
          gender: 'Women'
        },
        {
          id: '10',
          name: 'High-Waisted Jeans',
          price: 1999,
          description: 'Flattering high-waisted jeans with stretch fabric. Perfect fit with belt loops and classic styling.',
          image: '/images/products/female/high-waisted-jeans.jpg',
          category: 'Bottoms',
          subcategory: 'Jeans',
          gender: 'Women'
        },
        {
          id: '11',
          name: 'Leather Moto Jacket',
          price: 4999,
          description: 'Edgy moto jacket with asymmetrical zip and stud detailing. Genuine leather for authentic look.',
          image: '/images/products/female/leather-moto-jacket.jpg',
          category: 'Outerwear',
          subcategory: 'Jackets',
          gender: 'Women'
        },
        {
          id: '12',
          name: 'Floral Dress',
          price: 2299,
          description: 'Beautiful floral print dress with flowing silhouette. Perfect for spring and summer occasions.',
          image: '/images/products/female/floral-dress.jpg',
          category: 'Dresses',
          subcategory: 'Casual Dresses',
          gender: 'Women'
        },
        {
          id: '13',
          name: 'Mom Jeans',
          price: 1799,
          description: 'Retro style mom jeans with high waist and relaxed fit. Classic denim with modern comfort.',
          image: '/images/products/female/mom-jeans.jpg',
          category: 'Bottoms',
          subcategory: 'Jeans',
          gender: 'Women'
        },
        {
          id: '14',
          name: 'Crop Hoodie',
          price: 1399,
          description: 'Stylish crop hoodie with drawstring hood and kangaroo pocket. Perfect for casual streetwear looks.',
          image: '/images/products/female/crop-hoodie.jpg',
          category: 'Outerwear',
          subcategory: 'Hoodies',
          gender: 'Women'
        },
        {
          id: '15',
          name: 'Wrap Top',
          price: 1299,
          description: 'Elegant wrap top with adjustable tie closure. Flattering fit with three-quarter sleeves.',
          image: '/images/products/female/wrap-top.jpg',
          category: 'Tops',
          subcategory: 'Blouses',
          gender: 'Women'
        },
        {
          id: '16',
          name: 'Mini Skirt',
          price: 899,
          description: 'Cute mini skirt with elastic waistband. Perfect for casual outings and party wear.',
          image: '/images/products/female/mini-skirt.jpg',
          category: 'Bottoms',
          subcategory: 'Skirts',
          gender: 'Women'
        },
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

  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Bags', 'Hats', 'Shoes'];
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