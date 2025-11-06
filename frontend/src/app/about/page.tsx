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
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
              alt="RYSE Wears Fashion Store Interior"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
        
        {/* Company Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Behind the Brand</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden shadow-xl h-80">
              <Image
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80"
                alt="RYSE Wears Design Team at Work"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">Our Design Studio</h3>
                <p className="text-white/90 text-sm">Where creativity meets sustainability</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl h-80">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
                alt="RYSE Wears Team Collaboration"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">Our Team</h3>
                <p className="text-white/90 text-sm">Passionate about fashion and sustainability</p>
              </div>
            </div>
          </div>
        </div>

        {/* Manufacturing Process Video Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Manufacturing Process</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Witness the craftsmanship and dedication that goes into every piece. From sustainable sourcing to ethical production.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Video 1 - Production Process */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video 
                className="w-full h-full object-cover" 
                style={{ minHeight: '350px' }}
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/videos/Factory_Tour_Video_Clothing_Production.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-bold mb-2">Precision Craftsmanship</h3>
                <p className="text-white/90">Each garment is carefully crafted by skilled artisans</p>
              </div>
            </div>

            {/* Video 2 - Quality Control */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <video 
                className="w-full h-full object-cover" 
                style={{ minHeight: '350px' }}
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="https://cdn.pixabay.com/video/2024/03/15/204572-924820980_large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-bold mb-2">Sustainable Materials</h3>
                <p className="text-white/90">Eco-friendly fabrics sourced from ethical suppliers</p>
              </div>
            </div>
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