'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '../../../context/CartContext';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { API_URL } from '../../../config/api';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  gender?: string;
  sizes?: string[];
  colors?: string[];
  stock: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/products/${params.id}`);
      const data = await response.json();
      setProduct(data);
      
      // Set default selections
      if (data.sizes && data.sizes.length > 0) {
        setSelectedSize(data.sizes[0]);
      }
      if (data.colors && data.colors.length > 0) {
        setSelectedColor(data.colors[0]);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id, fetchProduct]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      id: product._id,
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.subcategory || product.category,
      quantity: quantity,
    };

    addItem(cartItem);
    alert(`${quantity} ${product.name}(s) added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 dark:bg-slate-800 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    // Mock data for offline mode with Western products
    const mockProduct: Product = {
      _id: params.id as string,
      name: 'Classic White T-Shirt',
      price: 799,
      description: 'Premium cotton crew neck t-shirt, perfect for everyday wear. Soft fabric and comfortable fit.',
      image: '/images/products/male/classic-white-tshirt.jpg',
      category: 'Tops',
      subcategory: 'T-Shirts',
      gender: 'Men',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Black', 'Grey'],
      stock: 50
    };

    // In a real application, you would fetch the product data from an API
    // For now, we'll use mock data
    const mockProducts: Product[] = [
      {
        _id: '1',
        name: 'Classic White T-Shirt',
        price: 799,
        description: 'Premium cotton crew neck t-shirt, perfect for everyday wear. Soft fabric and comfortable fit.',
        image: '/images/products/male/classic-white-tshirt.jpg',
        category: 'Tops',
        subcategory: 'T-Shirts',
        gender: 'Men',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['White', 'Black', 'Grey'],
        stock: 50
      },
      {
        _id: '2',
        name: 'Slim Fit Jeans',
        price: 1899,
        description: 'Modern slim fit jeans with stretch fabric for comfort. Classic blue denim with five-pocket styling.',
        image: '/images/products/male/slim-fit-jeans.jpg',
        category: 'Bottoms',
        subcategory: 'Jeans',
        gender: 'Men',
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Blue', 'Black', 'Grey'],
        stock: 40
      },
      {
        _id: '3',
        name: 'Black Leather Jacket',
        price: 4999,
        description: 'Genuine leather biker jacket with quilted lining. Classic moto style with zippered pockets.',
        image: '/images/products/male/black-leather-jacket.jpg',
        category: 'Outerwear',
        subcategory: 'Jackets',
        gender: 'Men',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Brown'],
        stock: 20
      },
      {
        _id: '4',
        name: 'Casual Plaid Shirt',
        price: 1299,
        description: 'Soft cotton flannel shirt with classic plaid pattern. Button-down style with chest pocket.',
        image: '/images/products/male/casual-plaid-shirt.jpg',
        category: 'Tops',
        subcategory: 'Shirts',
        gender: 'Men',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Red', 'Blue', 'Green', 'Black'],
        stock: 35
      },
      {
        _id: '5',
        name: 'Navy Blue Chinos',
        price: 1599,
        description: 'Slim fit chino pants in classic navy blue. Made from premium cotton twill with belt loops.',
        image: '/images/products/male/navy-blue-chinos.jpg',
        category: 'Bottoms',
        subcategory: 'Chinos',
        gender: 'Men',
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Navy', 'Khaki', 'Olive'],
        stock: 30
      },
      {
        _id: '6',
        name: 'Hooded Sweatshirt',
        price: 1399,
        description: 'Comfortable hoodie with kangaroo pocket and adjustable drawstring hood. Perfect for casual wear.',
        image: '/images/products/male/hooded-sweatshirt.jpg',
        category: 'Outerwear',
        subcategory: 'Hoodies',
        gender: 'Men',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Grey', 'Black', 'Navy', 'Green'],
        stock: 25
      },
      {
        _id: '7',
        name: 'Polo Shirt',
        price: 999,
        description: 'Classic polo shirt with ribbed collar and button placket. Made from breathable cotton pique.',
        image: '/images/products/male/polo-shirt.jpg',
        category: 'Tops',
        subcategory: 'Polo',
        gender: 'Men',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Blue', 'Red', 'Black'],
        stock: 40
      },
      {
        _id: '8',
        name: 'Cargo Pants',
        price: 1799,
        description: 'Tactical cargo pants with multiple utility pockets. Durable cotton blend with relaxed fit.',
        image: '/images/products/male/cargo-pants.jpg',
        category: 'Bottoms',
        subcategory: 'Pants',
        gender: 'Men',
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Khaki', 'Black', 'Olive'],
        stock: 25
      },
      {
        _id: '9',
        name: 'Off-Shoulder Top',
        price: 1199,
        description: 'Trendy off-shoulder top with elastic neckline. Perfect for date nights and summer events.',
        image: '/images/products/female/off-shoulder-top.jpg',
        category: 'Tops',
        subcategory: 'Blouses',
        gender: 'Women',
        sizes: ['S', 'M', 'L'],
        colors: ['Red', 'Black', 'White', 'Navy'],
        stock: 25
      },
      {
        _id: '10',
        name: 'High-Waisted Jeans',
        price: 1999,
        description: 'Flattering high-waisted jeans with stretch fabric. Perfect fit with belt loops and classic styling.',
        image: '/images/products/female/high-waisted-jeans.jpg',
        category: 'Bottoms',
        subcategory: 'Jeans',
        gender: 'Women',
        sizes: ['24', '26', '28', '30', '32'],
        colors: ['Blue', 'Black', 'White'],
        stock: 30
      },
      {
        _id: '11',
        name: 'Leather Moto Jacket',
        price: 4999,
        description: 'Edgy moto jacket with asymmetrical zip and stud detailing. Genuine leather for authentic look.',
        image: '/images/products/female/leather-moto-jacket.jpg',
        category: 'Outerwear',
        subcategory: 'Jackets',
        gender: 'Women',
        sizes: ['S', 'M', 'L'],
        colors: ['Black', 'Brown'],
        stock: 15
      },
      {
        _id: '12',
        name: 'Floral Dress',
        price: 2299,
        description: 'Beautiful floral print dress with flowing silhouette. Perfect for spring and summer occasions.',
        image: '/images/products/female/floral-dress.jpg',
        category: 'Dresses',
        subcategory: 'Casual Dresses',
        gender: 'Women',
        sizes: ['S', 'M', 'L'],
        colors: ['Multicolor', 'Blue', 'Pink'],
        stock: 20
      }
    ];

    // Check if ID matches one of our mock products
    const foundProduct = mockProducts.find(p => p._id === params.id);
    if (foundProduct) {
      setProduct(foundProduct);
      setLoading(false);
      return null;
    }
    
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product not found</h2>
          <button
            onClick={() => router.push('/products')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
          >
            Back to Products
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push('/products')}
          className="mb-8 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="relative h-96 lg:h-[600px]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                  {product.subcategory || product.category}
                </span>
                {product.gender && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    • {product.gender}
                  </span>
                )}
              </div>
              <h1 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                ₹{product.price.toFixed(2)}
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Select Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-900'
                          : 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-600 dark:hover:border-indigo-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Select Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                        selectedColor === color
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-900'
                          : 'bg-white dark:bg-slate-700 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-indigo-600 dark:hover:border-indigo-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-lg bg-white dark:bg-slate-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors"
                >
                  -
                </button>
                <span className="text-2xl font-bold text-gray-900 dark:text-white w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-12 h-12 rounded-lg bg-white dark:bg-slate-700 border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors"
                >
                  +
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Free shipping on orders over ₹2000
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Easy returns within 7 days
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  100% authentic products
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}