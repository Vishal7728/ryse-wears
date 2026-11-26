'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { API_URL } from '../../config/api';

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

interface ApiProduct {
  _id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
  category?: string;
  subcategory?: string;
  gender?: string;
  sizes?: string[];
  colors?: string[];
  stock?: number;
}

const fallbackProducts: Product[] = [
  { id: '1', name: 'Classic White T-Shirt', price: 799, description: 'Premium cotton crew neck t-shirt for everyday wear.', image: '/images/products/male/classic-white-tshirt.jpg', category: 'T-Shirts', gender: 'Men' },
  { id: '2', name: 'Slim Fit Jeans', price: 1899, description: 'Modern slim fit jeans with stretch fabric for comfort.', image: '/images/products/male/slim-fit-jeans.jpg', category: 'Jeans', gender: 'Men' },
  { id: '3', name: 'Black Leather Jacket', price: 4999, description: 'A timeless outer layer with a clean, confident fit.', image: '/images/products/male/black-leather-jacket.jpg', category: 'Jackets', gender: 'Men' },
  { id: '4', name: 'Casual Plaid Shirt', price: 1299, description: 'Soft cotton shirt with a classic plaid pattern.', image: '/images/products/male/casual-plaid-shirt.jpg', category: 'Shirts', gender: 'Men' },
  { id: '9', name: 'Off-Shoulder Top', price: 1199, description: 'An easy statement top for day-to-evening styling.', image: '/images/products/female/off-shoulder-top.jpg', category: 'Tops', gender: 'Women' },
  { id: '10', name: 'High-Waisted Jeans', price: 1999, description: 'A flattering high-rise shape with comfortable stretch.', image: '/images/products/female/high-waisted-jeans.jpg', category: 'Jeans', gender: 'Women' },
  { id: '11', name: 'Leather Moto Jacket', price: 4999, description: 'A modern moto jacket with a confident silhouette.', image: '/images/products/female/leather-moto-jacket.jpg', category: 'Jackets', gender: 'Women' },
  { id: '12', name: 'Floral Dress', price: 2299, description: 'A flowing dress for effortless occasion styling.', image: '/images/products/female/floral-dress.jpg', category: 'Dresses', gender: 'Women' },
];

export default function ClientProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [apiUnavailable, setApiUnavailable] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSelectedGender(params.get('gender') || 'All');
    const initialSearch = params.get('search') || '';
    setSearchInput(initialSearch);
    setSearchQuery(initialSearch);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setSearchQuery(searchInput.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  const fetchProducts = useCallback(() => {
    const controller = new AbortController();
    const load = async () => {
      setLoading(true);
      const params = new URLSearchParams({ limit: '100' });
      if (selectedCategory !== 'All') params.set('subcategory', selectedCategory);
      if (selectedGender !== 'All') params.set('gender', selectedGender);
      if (searchQuery) params.set('search', searchQuery);

      try {
        const response = await fetch(\`\${API_URL}/api/products?\${params.toString()}\`, { signal: controller.signal });
        if (!response.ok) throw new Error('Product service returned an error');
        const data = await response.json();
        const rows: ApiProduct[] = Array.isArray(data) ? data : Array.isArray(data.products) ? data.products : [];
        const mapped = rows.map((item) => ({
          id: item._id,
          name: item.name,
          price: Number(item.price),
          description: item.description || '',
          image: item.image,
          category: item.subcategory || item.category || 'Collection',
          subcategory: item.subcategory,
          gender: item.gender,
          sizes: item.sizes,
          colors: item.colors,
          stock: item.stock,
        }));
        setProducts(mapped);
        setApiUnavailable(false);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
        setApiUnavailable(true);
        const query = searchQuery.toLowerCase();
        setProducts(fallbackProducts.filter((item) =>
          (selectedGender === 'All' || item.gender?.toLowerCase() === selectedGender.toLowerCase()) &&
          (selectedCategory === 'All' || item.category?.toLowerCase() === selectedCategory.toLowerCase()) &&
          (!query || \`\${item.name} \${item.description} \${item.category}\`.toLowerCase().includes(query))
        ));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    void load();
    return () => controller.abort();
  }, [selectedCategory, selectedGender, searchQuery]);

  useEffect(() => fetchProducts(), [fetchProducts]);

  const visibleProducts = useMemo(() => {
    const sorted = [...products];
    if (sort === 'price-low') sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-high') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    return sorted;
  }, [products, sort]);

  const title = selectedGender === 'Men' ? 'The men’s edit' : selectedGender === 'Women' ? 'The women’s edit' : 'The RYSE collection';
  const description = selectedGender === 'Men'
    ? 'Everyday essentials, considered layers and easy pieces made to move with you.'
    : selectedGender === 'Women'
      ? 'Modern silhouettes, versatile staples and pieces that make your style your own.'
      : 'Explore the full collection and find the pieces that feel like you.';

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section className="bg-[#762f3d] px-5 py-12 text-white sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/65">RYSE WEARS / SHOP</p>
          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="font-display text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">{title}</h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/75">{description}</p>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/65">Find your fit. Make it yours.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
        <div className="flex flex-col gap-6 border-b border-[var(--border)] pb-7">
          <div className="flex flex-wrap gap-2" aria-label="Shop by gender">
            {[
              { label: 'All pieces', value: 'All' },
              { label: 'Men', value: 'Men' },
              { label: 'Women', value: 'Women' },
            ].map((option) => (
              <button key={option.value} type="button" onClick={() => setSelectedGender(option.value)} aria-pressed={selectedGender === option.value}
                className={\`border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline-offset-4 \${selectedGender === option.value ? 'border-[var(--accent)] bg-[var(--accent)] text-white' : 'border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)]'}\`}>
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_210px_190px]">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <svg className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
              <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search by name, style or category…" className="h-12 w-full border border-[var(--border)] bg-[var(--surface)] pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]" />
            </label>
            <label className="flex h-12 items-center border border-[var(--border)] bg-[var(--surface)] px-3">
              <span className="mr-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Category</span>
              <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="min-w-0 flex-1 bg-transparent text-xs outline-none">
                {['All', 'T-Shirts', 'Shirts', 'Jeans', 'Jackets', 'Tops', 'Dresses', 'Bottoms', 'Outerwear'].map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            <label className="flex h-12 items-center border border-[var(--border)] bg-[var(--surface)] px-3">
              <span className="mr-2 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Sort</span>
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="min-w-0 flex-1 bg-transparent text-xs outline-none">
                <option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name A–Z</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between py-6">
          <p className="text-xs text-[var(--muted)]">{loading ? 'Finding your pieces…' : \`\${visibleProducts.length} pieces\`}</p>
          {(selectedGender !== 'All' || selectedCategory !== 'All' || searchInput) && (
            <button type="button" onClick={() => { setSelectedGender('All'); setSelectedCategory('All'); setSearchInput(''); setSearchQuery(''); }} className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--accent)] transition-colors hover:text-[var(--accent-strong)]">Clear filters</button>
          )}
        </div>

        {apiUnavailable && <p className="mb-5 border-l-2 border-[var(--accent)] bg-[var(--accent-soft)] px-4 py-3 text-xs text-[var(--muted)]">Showing the sample catalogue while the live product service is unavailable.</p>}

        {loading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => <div key={index}><div className="shimmer aspect-[4/5]" /><div className="mt-4 h-3 w-2/3 bg-black/10 dark:bg-white/10" /><div className="mt-3 h-3 w-1/3 bg-black/10 dark:bg-white/10" /></div>)}
          </div>
        ) : visibleProducts.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-16 text-center">
            <p className="font-display text-2xl font-semibold">No pieces found.</p>
            <p className="mt-3 text-sm text-[var(--muted)]">Try another search or clear the filters to see the full edit.</p>
            <button type="button" onClick={() => { setSelectedGender('All'); setSelectedCategory('All'); setSearchInput(''); setSearchQuery(''); }} className="mt-6 bg-[var(--accent)] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[var(--accent-strong)]">Reset filters</button>
          </div>
        )}
      </section>
    </main>
  );
}
