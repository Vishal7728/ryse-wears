'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TestPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">CSS Test Page</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            If you can see this styled correctly, Tailwind CSS is working!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-2">Blue Box</h2>
              <p className="text-blue-700 dark:text-blue-300">
                This should appear with a blue background and proper text colors.
              </p>
            </div>
            
            <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">Green Box</h2>
              <p className="text-green-700 dark:text-green-300">
                This should appear with a green background and proper text colors.
              </p>
            </div>
            
            <div className="bg-purple-100 dark:bg-purple-900 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200 mb-2">Purple Box</h2>
              <p className="text-purple-700 dark:text-purple-300">
                This should appear with a purple background and proper text colors.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors mr-4">
              Black Button
            </button>
            <button className="bg-white text-black border border-black px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              White Button
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}