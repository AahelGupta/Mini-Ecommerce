const CATEGORIES = [
  { key: 'all',              label: 'All Products' },
  { key: 'electronics',     label: 'Electronics'  },
  { key: 'jewelery',        label: 'Jewellery'    },
  { key: "men's clothing",  label: "Men's Fashion" },
  { key: "women's clothing",label: "Women's Fashion" },
];

export default function CategoryBar({ active, onSelect }) {
  return (
    <div className="category-bar" id="category-bar">
      <div className="category-inner">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            id={`cat-${cat.key.replace(/[' ]/g, '-')}`}
            className={`cat-pill${active === cat.key ? ' active' : ''}`}
            data-category={cat.key}
            onClick={() => onSelect(cat.key)}
            aria-pressed={active === cat.key}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
