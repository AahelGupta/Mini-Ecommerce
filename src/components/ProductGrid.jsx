import { useMemo } from 'react';
import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';
import CategoryBar from './CategoryBar';

const SORT_OPTIONS = [
  { value: 'default',    label: 'Featured'           },
  { value: 'price-asc',  label: 'Price: Low → High'  },
  { value: 'price-desc', label: 'Price: High → Low'  },
  { value: 'rating',     label: 'Top Rated'           },
  { value: 'name-az',    label: 'Name A–Z'            },
];

export default function ProductGrid({
  products, loading, error,
  category, onCategoryChange,
  sortBy, onSortChange,
  searchQuery,
  onQuickView, onReset,
}) {
  const filtered = useMemo(() => {
    let list = [...products];

    // Category filter
    if (category !== 'all') {
      list = list.filter(p => p.category === category);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)); break;
      case 'name-az':    list.sort((a, b) => a.title.localeCompare(b.title)); break;
      default: break;
    }

    return list;
  }, [products, category, searchQuery, sortBy]);

  const isEmpty = !loading && filtered.length === 0 && !error;

  return (
    <main className="store" id="store-section">
      <CategoryBar active={category} onSelect={onCategoryChange} />

      {/* Toolbar */}
      <div className="toolbar" id="toolbar">
        <p className="results-count" id="results-count">
          {loading ? 'Loading products…' : (
            <>
              Showing <strong>{filtered.length}</strong> product{filtered.length !== 1 ? 's' : ''}
              {searchQuery && <> for <strong>"{searchQuery}"</strong></>}
            </>
          )}
        </p>
        <div className="sort-wrap">
          <label htmlFor="sort-select" className="sort-label">Sort by</label>
          <select
            id="sort-select"
            className="sort-select"
            value={sortBy}
            onChange={e => onSortChange(e.target.value)}
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Failed to load products</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      )}

      {/* Grid */}
      {!error && (
        <div className="product-grid" id="product-grid" role="list" aria-label="Product listing">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((p, i) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={onQuickView}
                  animDelay={i * 40}
                />
              ))
          }
        </div>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="empty-state" id="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>No products found</h3>
          <p>Try a different search term or category.</p>
          <button className="btn-primary" id="reset-btn" onClick={onReset}>Reset Filters</button>
        </div>
      )}
    </main>
  );
}
