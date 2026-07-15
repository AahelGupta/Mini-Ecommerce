import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';

export default function WishlistPage() {
  const { items, toggle } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Wishlist</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
        </div>
        <button onClick={() => navigate('/')} className="btn-secondary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Shop
        </button>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 space-y-4">
          <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-12 h-12 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-300">Your wishlist is empty</h2>
          <p className="text-gray-500">Save items you love and come back to them later.</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-2">Discover Products</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map(product => (
            <div key={product.id} id={`wishlist-item-${product.id}`} className="card overflow-hidden animate-fade-in group">
              <div
                className="relative bg-gray-50 dark:bg-gray-800 h-48 flex items-center justify-center p-6 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  id={`remove-wishlist-${product.id}`}
                  onClick={(e) => { e.stopPropagation(); toggle(product); }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 transition-colors active:scale-90"
                  aria-label="Remove from wishlist"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-4 space-y-2">
                <p
                  className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 cursor-pointer hover:text-primary-500 transition-colors"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.title}
                </p>
                <StarRating rating={product.rating?.rate ?? 0} count={product.rating?.count} />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">${product.price?.toFixed(2)}</span>
                  <button
                    id={`wishlist-add-cart-${product.id}`}
                    onClick={() => addToCart(product)}
                    className="btn-primary text-sm px-3 py-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
