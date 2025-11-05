'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About RYSE Wears</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Elevating fashion since 2025 with sustainable, stylish clothing for the modern individual.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Founded in 2025, RYSE Wears began with a simple mission: to create fashion that empowers individuals 
              to express their unique style while making responsible choices for our planet.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              What started as a small boutique has grown into a global movement of conscious consumers who believe 
              that looking good and doing good can go hand in hand.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Today, we continue to push boundaries in sustainable fashion, working with ethical suppliers and 
              innovative materials to create pieces that stand the test of time.
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden shadow-2xl h-96">
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea3c8b37?w=800&q=80"
              alt="RYSE Wears Store"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center group">
            <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Image
                src="https://images.unsplash.com/photo-1558769132-cb1aea3c8b37?w=200&q=80"
                alt="Sustainable Materials"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sustainable Materials</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We source eco-friendly fabrics and materials to minimize our environmental impact.
            </p>
          </div>
          <div className="text-center group">
            <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Image
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=200&q=80"
                alt="Ethical Production"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Ethical Production</h3>
            <p className="text-gray-600 dark:text-gray-300">
              All our products are made in facilities that ensure fair wages and safe working conditions.
            </p>
          </div>
          <div className="text-center group">
            <div className="relative w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&q=80"
                alt="Timeless Design"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Timeless Design</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Our pieces are designed to last, reducing the need for frequent replacements.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Join Our Movement</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Be part of a community that values both style and sustainability. Subscribe to our newsletter 
            for exclusive offers, style tips, and updates on our sustainability initiatives.
          </p>
          <div className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <button className="bg-black text-white px-6 py-2 rounded-r-lg hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}