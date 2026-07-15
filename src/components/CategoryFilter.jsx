const CATEGORIES = ['all', "electronics", "jewelery", "men's clothing", "women's clothing"];

const categoryIcons = {
  all: '🛍️',
  electronics: '⚡',
  jewelery: '💎',
  "men's clothing": '👔',
  "women's clothing": '👗',
};

export default function CategoryFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" id="category-filter">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          id={`filter-${cat.replace(/\s+/g, '-')}`}
          onClick={() => onChange(cat)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 active:scale-95
            ${selected === cat
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 scale-105'
              : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}
        >
          <span>{categoryIcons[cat]}</span>
          {cat === 'all' ? 'All Products' : cat}
        </button>
      ))}
    </div>
  );
}
