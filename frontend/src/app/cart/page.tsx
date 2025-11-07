'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();

  const handleQuantityChange = (id: number | string, quantity: number) => {
    if (quantity < 1) return;
    // Ensure the ID is passed correctly to the context function
    updateQuantity(id, quantity);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-xl text-gray-500 mb-6">Your cart is empty</p>
            <Link 
              href="/products" 
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="p-6 hover:bg-gray-50 transition-all duration-200 border border-gray-100 rounded-lg shadow-sm hover:shadow-md">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden shadow-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          unoptimized
                        />
                      </div>
                      
                      <div className="ml-6 flex-1">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <p className="text-lg font-bold text-indigo-600">₹{item.price.toFixed(2)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                            <button 
                              onClick={() => handleQuantityChange(item.id || item._id || '', item.quantity - 1)}
                              className="px-3 py-1 bg-white hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="px-4 py-1 bg-white text-gray-900 font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => handleQuantityChange(item.id || item._id || '', item.quantity + 1)}
                              className="px-3 py-1 bg-white hover:bg-gray-100 text-gray-600 transition-colors duration-200"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id || item._id || '')}
                            className="flex items-center text-red-600 hover:text-red-800 transition-colors duration-200 group"
                          >
                            <svg className="w-5 h-5 mr-1 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="text-gray-900">₹{total.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Shipping</p>
                <p className="text-gray-900">₹49.99</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-600">Tax</p>
                <p className="text-gray-900">₹{(total * 0.18).toFixed(2)}</p>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
                <p>Total</p>
                <p>₹{(total + 49.99 + (total * 0.18)).toFixed(2)}</p>
              </div>
              <Link 
                href="/checkout"
                className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium text-center transition-all duration-300 transform hover:scale-105"
              >
                Proceed to Checkout
              </Link>
              <Link 
                href="/products" 
                className="block text-center text-gray-600 hover:text-gray-900"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}