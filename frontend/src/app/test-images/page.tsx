'use client';

import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TestImagesPage() {
  const westernProducts = [
    // Male Products
    {
      id: '1',
      name: 'Classic White T-Shirt',
      image: '/images/products/male/classic-white-tshirt.jpg',
      category: 'Tops',
      gender: 'Men'
    },
    {
      id: '2',
      name: 'Slim Fit Jeans',
      image: '/images/products/male/slim-fit-jeans.jpg',
      category: 'Bottoms',
      gender: 'Men'
    },
    {
      id: '3',
      name: 'Black Leather Jacket',
      image: '/images/products/male/black-leather-jacket.jpg',
      category: 'Outerwear',
      gender: 'Men'
    },
    {
      id: '4',
      name: 'Casual Plaid Shirt',
      image: '/images/products/male/casual-plaid-shirt.jpg',
      category: 'Tops',
      gender: 'Men'
    },
    
    // Female Products
    {
      id: '5',
      name: 'Off-Shoulder Top',
      image: '/images/products/female/off-shoulder-top.jpg',
      category: 'Tops',
      gender: 'Women'
    },
    {
      id: '6',
      name: 'High-Waisted Jeans',
      image: '/images/products/female/high-waisted-jeans.jpg',
      category: 'Bottoms',
      gender: 'Women'
    },
    {
      id: '7',
      name: 'Leather Moto Jacket',
      image: '/images/products/female/leather-moto-jacket.jpg',
      category: 'Outerwear',
      gender: 'Women'
    },
    {
      id: '8',
      name: 'Floral Dress',
      image: '/images/products/female/floral-dress.jpg',
      category: 'Dresses',
      gender: 'Women'
    },
    
    // Accessories
    {
      id: '9',
      name: 'Leather Crossbody Bag',
      image: '/images/products/accessories/leather-crossbody-bag.jpg',
      category: 'Bags',
      gender: 'Unisex'
    },
    {
      id: '10',
      name: 'Baseball Cap',
      image: '/images/products/accessories/baseball-cap.jpg',
      category: 'Hats',
      gender: 'Unisex'
    },
    {
      id: '11',
      name: 'Sneakers',
      image: '/images/products/accessories/sneakers.jpg',
      category: 'Shoes',
      gender: 'Unisex'
    },
    {
      id: '12',
      name: 'Tote Bag',
      image: '/images/products/accessories/tote-bag.jpg',
      category: 'Bags',
      gender: 'Unisex'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Western Products Image Test
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Preview of all Western fashion products with local image paths
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {westernProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {product.category}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    {product.gender}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Image Setup Instructions
          </h2>
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <h3>Folder Structure:</h3>
            <ul>
              <li><code>public/images/products/male/</code> - Male clothing images</li>
              <li><code>public/images/products/female/</code> - Female clothing images</li>
              <li><code>public/images/products/accessories/</code> - Accessories images</li>
            </ul>
            
            <h3>Naming Convention:</h3>
            <p>Images should be named exactly as shown above:</p>
            <ul>
              <li><code>classic-white-tshirt.jpg</code></li>
              <li><code>slim-fit-jeans.jpg</code></li>
              <li><code>off-shoulder-top.jpg</code></li>
              <li>etc.</li>
            </ul>
            
            <h3>Deployment:</h3>
            <p>When deploying to Vercel, images in the <code>public</code> folder are automatically served at the root path:</p>
            <code>/images/products/male/classic-white-tshirt.jpg</code>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}