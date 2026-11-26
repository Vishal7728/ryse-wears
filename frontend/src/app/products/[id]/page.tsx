'use client';

import { useCallback, useEffect, useState } from 'react';
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
  stock?: number;
}

const fallback: Product[] = [
  { _id: '1', name: 'Classic White T-Shirt', price: 799, description: 'Premium cotton crew neck t-shirt, perfect for everyday wear.', image: '/images/products/male/classic-white-tshirt.jpg', category: 'Tops', gender: 'Men', sizes: ['S', 'M', 'L', 'XL'], colors: ['White', 'Black', 'Grey'], stock: 50 },
  { _id: '2', name: 'Slim Fit Jeans', price: 1899, description: 'Modern slim fit jeans with stretch fabric for comfort. Classic blue denim with five-pocket styling.', image: '/images/products/male/slim-fit-jeans.jpg', category: 'Bottoms', subcategory: 'Jeans', gender: 'Men', sizes: ['28', '30', '32', '34', '36'], colors: ['Blue', 'Black', 'Grey'], stock: 40 },
  { _id: '3', name: 'Black Leather Jacket', price: 4999, description: 'A timeless outer layer with a clean, confident fit.', image: '/images/products/male/black-leather-jacket.jpg', category: 'Outerwear', gender: 'Men', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Brown'], stock: 20 },
  { _id: '9', name: 'Off-Shoulder Top', price: 1199, description: 'An easy statement top for day-to-evening styling.', image: '/images/products/female/off-shoulder-top.jpg', category: 'Tops', gender: 'Women', sizes: ['S', 'M', 'L'], colors: ['Red', 'Black', 'White'], stock: 25 },
  { _id: '10', name: 'High-Waisted Jeans', price: 1999, description: 'A flattering high-rise shape with comfortable stretch.', image: '/images/products/female/high-waisted-jeans.jpg', category: 'Bottoms', gender: 'Women', sizes: ['24', '26', '28', '30'], colors: ['Blue', 'Black'], stock: 30 },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/products/${params.id}`);
      if (!response.ok) throw new Error('Product not found');
      const data = await response.json();
      setProduct(data);
      setSelectedSize(data.sizes?.[0] || '');
      setSelectedColor(data.colors?.[0] || '');
    } catch {
      const local = fallback.find((item) => item._id === String(params.id));
      setProduct(local || null);
      setSelectedSize(local?.sizes?.[0] || '');
      setSelectedColor(local?.colors?.[0] || '');
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => { fetchProduct(); }, [fetchProduct]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      id: product._id,
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.subcategory || product.category,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  const sizes = product?.sizes?.length ? product.sizes : ['S', 'M', 'L', 'XL'];
  const colors = product?.colors?.length ? product.colors : ['Black', 'White', 'Grey'];

  if (loading) return <main className="min-h-screen bg-[var(--background)]"><Header /><div className="mx-auto max-w-5xl px-5 py-24"><div className="grid gap-10 md:grid-cols-2"><div className="shimmer aspect-[4/5]" /><div className="space-y-5"><div className="shimmer h-8 w-2/3" /><div className="shimmer h-5 w-1/3" /><div className="shimmer h-24 w-full" /></div></div></div><Footer /></main>;

  if (!product) return <main className="min-h-screen bg-[var(--background)]"><Header /><div className="mx-auto max-w-3xl px-5 py-24 text-center"><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">RYSE WEARS</p><h1 className="mt-4 font-display text-3xl font-semibold">We couldn’t find that piece.</h1><button onClick={() => router.push('/products')} className="mt-7 bg-[var(--accent)] px-6 py-3 text-xs font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[var(--accent-strong)]">Back to shop</button></div><Footer /></main>;

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <div className="mx-auto max-w-[1280px] px-5 py-9 sm:px-8 sm:py-14">
        <button onClick={() => router.back()} className="mb-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]">← Back to collection</button>
        <div className="grid gap-9 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="relative overflow-hidden bg-[#eee9e4] dark:bg-[#302927]">
            <div className="relative aspect-[4/5]">
              <Image src={product.image} alt={product.name} fill priority unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <span className="absolute left-4 top-4 bg-white/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#4c3938]">{product.subcategory || product.category}</span>
          </div>

          <div className="flex flex-col justify-center py-2">
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[var(--accent)]"><span>{product.subcategory || product.category}</span><span className="h-1 w-1 rounded-full bg-[var(--muted)]" /><span className="text-[var(--muted)]">{product.gender || 'RYSE collection'}</span></div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight tracking-[-0.055em] sm:text-5xl">{product.name}</h1>
            <p className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-[var(--accent)]">₹{Number(product.price).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</p>
            <div className="mt-7 border-y border-[var(--border)] py-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.16em]">Description</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{product.description}</p>
            </div>

            <div className="border-b border-[var(--border)] py-6">
              <div className="flex items-center justify-between"><h2 className="text-[10px] font-bold uppercase tracking-[0.16em]">Select size</h2><span className="text-[10px] text-[var(--muted)]">Choose your fit</span></div>
              <div className="mt-4 flex flex-wrap gap-2">{sizes.map((size) => <button key={size} type="button" onClick={() => setSelectedSize(size)} aria-pressed={selectedSize === size} className={`min-w-12 border px-4 py-3 text-xs font-semibold transition-colors ${selectedSize === size ? 'border-[var(--accent)] bg-[var(--accent)] text-white' : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}`}>{size}</button>)}</div>
            </div>

            <div className="border-b border-[var(--border)] py-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.16em]">Select colour</h2>
              <div className="mt-4 flex flex-wrap gap-2">{colors.map((color) => <button key={color} type="button" onClick={() => setSelectedColor(color)} aria-pressed={selectedColor === color} className={`border px-4 py-3 text-xs font-semibold transition-colors ${selectedColor === color ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]' : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]'}`}>{color}</button>)}</div>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-b border-[var(--border)] py-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em]">Quantity</span>
              <div className="flex items-center border border-[var(--border)] bg-[var(--surface)]">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-10 w-10 transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]" aria-label="Decrease quantity">−</button>
                <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => Math.min(product.stock || 99, value + 1))} className="h-10 w-10 transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]" aria-label="Increase quantity">+</button>
              </div>
              <span className="text-xs text-[var(--muted)]">{typeof product.stock === 'number' ? `${product.stock} available` : 'Ready to wear'}</span>
            </div>

            <button type="button" onClick={handleAddToCart} className="mt-6 min-h-12 w-full bg-[var(--accent)] px-6 text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[var(--accent-strong)] focus-visible:outline-offset-4">{added ? 'Added to bag ✓' : 'Add to bag'}</button>
            <ul className="mt-6 space-y-3 text-xs text-[var(--muted)]"><li className="flex items-center gap-3"><span className="text-[var(--accent)]">✓</span>Free shipping on orders over ₹2,000</li><li className="flex items-center gap-3"><span className="text-[var(--accent)]">✓</span>Easy returns within 7 days</li><li className="flex items-center gap-3"><span className="text-[var(--accent)]">✓</span>Thoughtful pieces, made to wear your way</li></ul>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
