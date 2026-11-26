'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { API_URL } from '../config/api';

interface FeaturedProduct {
  id: number | string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface MongoProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  subcategory?: string;
}

const categories = [
  {
    label: 'Men',
    detail: 'Everyday essentials and considered layers',
    href: '/products?gender=Men',
    image: '/images/products/male/graphic-tee.jpg',
    position: 'center 28%',
  },
  {
    label: 'Women',
    detail: 'Modern silhouettes, made to move',
    href: '/products?gender=Women',
    image: '/images/products/female/floral-dress.jpg',
    position: 'center 30%',
  },
  {
    label: 'Explore all',
    detail: 'Find your next favourite piece',
    href: '/products',
    image: '/images/products/male/blazer.jpg',
    position: 'center',
  },
];

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products?limit=8`, { signal: controller.signal });
        if (!response.ok) throw new Error('Unable to load featured products');

        const data = await response.json();
        const productsData = Array.isArray(data) ? data : data.products || [];
        const products = productsData.slice(0, 8).map((product: MongoProduct) => ({
          id: product._id,
          name: product.name,
          price: Number(product.price),
          description: product.description,
          image: product.image,
          category: product.subcategory || product.category || 'General',
        }));

        setFeaturedProducts(products);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        console.error('Error fetching featured products:', error);
        setFeaturedProducts([
          {
            id: 1,
            name: 'Classic White T-Shirt',
            price: 799,
            description: 'Premium cotton crew neck t-shirt',
            image: '/images/products/male/classic-white-tshirt.jpg',
            category: 'Tops',
          },
          {
            id: 2,
            name: 'Slim Fit Jeans',
            price: 1899,
            description: 'Modern slim fit jeans with stretch fabric',
            image: '/images/products/male/slim-fit-jeans.jpg',
            category: 'Bottoms',
          },
          {
            id: 3,
            name: 'Black Leather Jacket',
            price: 4999,
            description: 'Genuine leather biker jacket',
            image: '/images/products/male/black-leather-jacket.jpg',
            category: 'Outerwear',
          },
          {
            id: 4,
            name: 'Off-Shoulder Top',
            price: 1199,
            description: 'Trendy off-shoulder top with elastic neckline',
            image: '/images/products/female/off-shoulder-top.jpg',
            category: 'Tops',
          },
        ]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchFeaturedProducts();
    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />

      <div className="bg-[#762f3d] px-4 py-2.5 text-center text-[9px] font-bold uppercase tracking-[0.19em] text-white sm:text-[10px]">
        RYSE WEARS <span className="mx-2 text-white/50">/</span> A considered approach to everyday style
      </div>

      <section className="relative isolate min-h-[620px] overflow-hidden bg-[#28211f] sm:min-h-[690px] lg:min-h-[min(760px,calc(100vh-110px))]">
        <Image
          src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=2200&q=90"
          alt="Fashion editorial campaign featuring contemporary styling"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171211]/80 via-[#171211]/45 to-[#171211]/10" />
        <div className="relative mx-auto flex min-h-[620px] max-w-[1440px] items-center px-6 py-20 sm:min-h-[690px] sm:px-10 lg:min-h-[min(760px,calc(100vh-110px))] lg:px-16">
          <div className="max-w-2xl text-white">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.28em] text-white/75 sm:text-xs">
              The new RYSE edit
            </p>
            <h1 className="max-w-xl font-display text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-8xl">
              Style that speaks <span className="font-normal italic text-[#e7c7c9]">for you.</span>
            </h1>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/80 sm:text-base">
              Discover versatile pieces, thoughtful details and fresh ways to make every look your own.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex min-h-12 items-center justify-center bg-white px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-[#211b1a] transition-colors hover:bg-[#ead9d9]">
                Shop the collection <span className="ml-3 text-base" aria-hidden="true">↗</span>
              </Link>
              <Link href="/about" className="inline-flex min-h-12 items-center justify-center border border-white/65 px-7 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#211b1a]">
                Discover RYSE
              </Link>
            </div>
          </div>
          <p className="absolute bottom-8 right-8 hidden text-[9px] font-semibold uppercase tracking-[0.2em] text-white/65 lg:block">
            RYSE WEARS — EST. 2025
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mb-9 flex items-end justify-between gap-5">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Find your direction</p>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">Shop by collection</h2>
          </div>
          <Link href="/products" className="hidden border-b border-[var(--accent)] pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent)] transition-opacity hover:opacity-70 sm:inline-flex">
            View everything <span className="ml-2" aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link key={category.label} href={category.href} className="group relative min-h-[390px] overflow-hidden bg-[#e9e3de] sm:min-h-[470px]">
              <Image
                src={category.image}
                alt={`${category.label} fashion collection`}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ objectPosition: category.position }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">0{index + 1} / RYSE EDIT</span>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">{category.label}</h3>
                <p className="mt-2 text-xs text-white/80">{category.detail}</p>
                <span className="mt-5 inline-flex items-center gap-3 border-b border-white/70 pb-1 text-[9px] font-bold uppercase tracking-[0.16em]">
                  Explore collection <span className="text-sm transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#f0ece7] py-16 dark:bg-[#211e1c] sm:py-20">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <div className="mb-9 flex items-end justify-between gap-5">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">Selected for you</p>
              <h2 className="font-display text-3xl font-semibold tracking-[-0.055em] sm:text-4xl">Featured pieces</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">A closer look at the collection.</p>
            </div>
            <Link href="/products" className="hidden border-b border-[var(--accent)] pb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent)] sm:inline-flex">
              Shop all <span className="ml-2" aria-hidden="true">↗</span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="shimmer aspect-[4/5] w-full" />
                  <div className="mt-4 h-3 w-2/3 animate-pulse bg-black/10 dark:bg-white/10" />
                  <div className="mt-3 h-3 w-1/3 animate-pulse bg-black/10 dark:bg-white/10" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 lg:grid-cols-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {!loading && featuredProducts.length === 0 && (
            <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-12 text-center">
              <p className="text-sm text-[var(--muted)]">Our collection is being updated. Please check back soon.</p>
              <Link href="/products" className="mt-4 inline-flex text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">Browse the shop</Link>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#762f3d] text-white">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-center px-6 py-16 sm:px-10 sm:py-24 lg:px-16">
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">A point of view</p>
            <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Less noise. <span className="font-normal italic text-[#e9cdd0]">More you.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/75">
              Personal style is never one-size-fits-all. Explore pieces that work together, move with you and make getting dressed feel effortless.
            </p>
            <Link href="/products" className="mt-8 inline-flex min-h-12 w-fit items-center border border-white/70 px-7 text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-white hover:text-[#762f3d]">
              Find your next look <span className="ml-3 text-base" aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="relative min-h-[360px] lg:min-h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1400&q=90"
              alt="Contemporary fashion editorial look"
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-8 border-y border-[var(--border)] py-9 sm:grid-cols-3 sm:gap-10">
          {[
            { number: '01', title: 'Thoughtful style', text: 'Explore versatile pieces for different moods and moments.' },
            { number: '02', title: 'Your point of view', text: 'Build a wardrobe that reflects the way you want to show up.' },
            { number: '03', title: 'A simpler edit', text: 'Find inspiration and discover your next favourite look.' },
          ].map((item) => (
            <div key={item.number} className="flex gap-4">
              <span className="pt-1 text-[10px] font-bold tracking-[0.15em] text-[var(--accent)]">{item.number}</span>
              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--muted)]">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
