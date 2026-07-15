import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import StarRating from '../components/StarRating';

function SkeletonDetail() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="h-96 shimmer rounded-3xl" />
        <div className="space-y-4">
          <div className="h-4 shimmer rounded-full w-1/4" />
          <div className="h-8 shimmer rounded-full w-3/4" />
          <div className="h-8 shimmer rounded-full w-1/2" />
          <div className="h-4 shimmer rounded-full w-full" />
          <div className="h-4 shimmer rounded-full w-5/6" />
          <div className="h-4 shimmer rounded-full w-4/6" />
          <div className="flex gap-3 mt-6">
            <div className="h-12 shimmer rounded-xl flex-1" />
            <div className="h-12 shimmer rounded-xl w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, items } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate('/');
      });
  }, [id, navigate]);

  if (loading) return <SkeletonDetail />;
  if (!product) return null;

  const inCart = items.some(i => i.id === product.id);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const categoryColor = {
    "electronics": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    "jewelery": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    "men's clothing": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    "women's clothing": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-primary-500 transition-colors">Home</button>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="capitalize text-gray-600 dark:text-gray-300 truncate max-w-xs">{product.category}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-800 dark:text-gray-100 truncate max-w-xs font-medium">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-10 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-800 min-h-80">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 w-full object-contain hover:scale-105 transition-transform duration-500"
          />
          <button
            id={`detail-wishlist-${product.id}`}
            onClick={() => toggle(product)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md transition-all duration-200 active:scale-90
              ${wishlisted ? 'bg-red-500 text-white' : 'bg-white dark:bg-gray-800 text-gray-400 hover:text-red-500'}`}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg className="w-5 h-5" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <span className={`self-start text-xs font-medium px-3 py-1.5 rounded-full capitalize ${categoryColor[product.category] || 'bg-gray-100 text-gray-600'}`}>
            {product.category}
          </span>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">{product.title}</h1>

          <div className="flex items-center gap-3">
            <StarRating rating={product.rating?.rate ?? 0} count={product.rating?.count} />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{product.rating?.rate?.toFixed(1)}</span>
          </div>

          <p className="text-4xl font-extrabold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
            ${product.price?.toFixed(2)}
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{product.description}</p>

          {/* Stock badge */}
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            In Stock — Ready to ship
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-2">
            <button
              id={`detail-add-cart-${product.id}`}
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-base transition-all duration-200 active:scale-95
                ${added
                  ? 'bg-green-500 text-white'
                  : 'bg-primary-500 hover:bg-primary-600 text-white hover:shadow-xl hover:shadow-primary-500/25'}`}
            >
              {added ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {inCart ? 'Add Another' : 'Add to Cart'}
                </>
              )}
            </button>

            <button
              onClick={() => navigate(-1)}
              className="btn-secondary px-4"
              aria-label="Go back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { icon: '🚚', label: 'Free Shipping' },
              { icon: '↩️', label: '30-Day Returns' },
              { icon: '🔒', label: 'Secure Payment' },
            ].map(b => (
              <div key={b.label} className="flex flex-col items-center gap-1 bg-gray-50 dark:bg-gray-900 rounded-xl p-3 text-center">
                <span className="text-xl">{b.icon}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
