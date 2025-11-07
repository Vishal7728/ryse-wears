'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TestImagesPage() {
  const [imageStatus, setImageStatus] = useState<{[key: string]: string}>({});

  const testImages = [
    {
      id: 'unsplash1',
      url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
      name: 'Unsplash Image 1'
    },
    {
      id: 'unsplash2',
      url: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=800',
      name: 'Unsplash Image 2'
    },
    {
      id: 'placeholder1',
      url: 'https://placehold.co/600x800/red/white?text=Test+Image',
      name: 'Placeholder Image 1'
    }
  ];

  const handleImageLoad = (id: string) => {
    setImageStatus(prev => ({ ...prev, [id]: 'Loaded' }));
  };

  const handleImageError = (id: string) => {
    setImageStatus(prev => ({ ...prev, [id]: 'Failed to load' }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Image Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testImages.map((img) => (
            <div key={img.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src={img.url}
                  alt={img.name}
                  fill
                  className="object-cover"
                  onLoadingComplete={() => handleImageLoad(img.id)}
                  onError={() => handleImageError(img.id)}
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{img.name}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Status: {imageStatus[img.id] || 'Loading...'}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                  {img.url}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}