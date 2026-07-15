import { useState, useEffect, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

// Skeleton loader
function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="h-52 shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-3 shimmer rounded-full w-3/4" />
        <div className="h-3 shimmer rounded-full w-1/2" />
        <div className="h-3 shimmer rounded-full w-1/4" />
        <div className="flex justify-between items-center mt-2">
          <div className="h-6 shimmer rounded-full w-16" />
          <div className="h-8 shimmer rounded-xl w-20" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    let result = products;

    if (category !== 'all') {
      result = result.filter(p => p.category === category);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'price-asc':   return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':  return [...result].sort((a, b) => b.price - a.price);
      case 'rating':      return [...result].sort((a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0));
      case 'popular':     return [...result].sort((a, b) => (b.rating?.count ?? 0) - (a.rating?.count ?? 0));
      default:            return result;
    }
  }, [products, category, search, sort]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-accent-500 p-8 md:p-12 text-white">
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-100 mb-2">New Season Arrivals</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            Discover Amazing<br />Products at ShopWave
          </h1>
          <p className="text-primary-100 text-lg max-w-lg mb-6">
            Shop the latest trends with free shipping, real ratings, and easy returns.
          </p>
          <a href="#products" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors shadow-lg">
            Shop Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute -bottom-16 -right-4 w-64 h-64 bg-white/10 rounded-full" />
        <div className="absolute top-4 right-32 w-16 h-16 bg-white/10 rounded-full" />
      </section>

      {/* Filters & Search */}
      <section id="products" className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              id="product-search"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
            />
          </div>

          {/* Sort */}
          <select
            id="product-sort"
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition"
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>

        <CategoryFilter selected={category} onChange={setCategory} />
      </section>

      {/* Product count */}
      {!loading && !error && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-700 dark:text-gray-200">{filtered.length}</span> products
            {category !== 'all' && <span className="capitalize"> in <span className="text-primary-500">{category}</span></span>}
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-16 space-y-4">
          <div className="text-5xl">😕</div>
          <p className="text-gray-500 font-medium">Failed to load products. {error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">Try Again</button>
        </div>
      )}

      {/* Product Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.length === 0
            ? (
              <div className="col-span-full text-center py-16 text-gray-400 space-y-3">
                <div className="text-5xl">🔍</div>
                <p className="font-semibold text-lg">No products found</p>
                <p className="text-sm">Try changing your filters or search term.</p>
                <button onClick={() => { setSearch(''); setCategory('all'); }} className="btn-secondary mt-2">
                  Clear Filters
                </button>
              </div>
            )
            : filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </section>
    </main>
  );
}
