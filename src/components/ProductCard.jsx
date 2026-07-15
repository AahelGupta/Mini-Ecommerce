import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from './StarRating';

export default function ProductCard({ product }) {
  const { addToCart, items } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const inCart = items.some(i => i.id === product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggle(product);
  };

  const categoryColor = {
    "electronics": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "jewelery": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "men's clothing": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "women's clothing": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  };

  return (
    <Link
      to={`/product/${product.id}`}
      id={`product-card-${product.id}`}
      className="card group flex flex-col overflow-hidden animate-fade-in hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative bg-gray-50 dark:bg-gray-800 h-52 flex items-center justify-center p-6 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.title}
            onError={() => setImgError(true)}
            className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-16 h-16 text-gray-300 flex items-center justify-center">
            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
          </div>
        )}

        {/* Wishlist button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90
            ${wishlisted
              ? 'bg-red-500 text-white scale-110'
              : 'bg-white dark:bg-gray-700 text-gray-400 hover:text-red-500 hover:scale-110'}`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Category badge */}
        <span className={`absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full capitalize ${categoryColor[product.category] || 'bg-gray-100 text-gray-600'}`}>
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-snug">
          {product.title}
        </h3>

        <StarRating rating={product.rating?.rate ?? 0} count={product.rating?.count} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
            ${product.price.toFixed(2)}
          </span>

          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddToCart}
            className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-2 rounded-xl transition-all duration-200 active:scale-95
              ${added
                ? 'bg-green-500 text-white'
                : inCart
                  ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                  : 'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/25'}`}
          >
            {added ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {inCart ? 'Add More' : 'Add'}
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
