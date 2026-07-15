import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeFromCart, updateQty, total, count, clearCart } = useCart();
  const navigate = useNavigate();
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [setIsOpen]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCheckout = () => {
    setIsOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        id="cart-sidebar"
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-950 z-50 flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Cart</h2>
            {count > 0 && (
              <span className="badge">{count}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                id="clear-cart"
                onClick={clearCart}
                className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                Clear all
              </button>
            )}
            <button
              id="close-cart"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4 text-gray-400">
              <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-500 dark:text-gray-400">Your cart is empty</p>
                <p className="text-sm mt-1">Add some items to get started!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary"
              >
                Browse Products
              </button>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                id={`cart-item-${item.id}`}
                className="flex gap-3 bg-gray-50 dark:bg-gray-900 rounded-2xl p-3 animate-fade-in"
              >
                <div className="w-16 h-16 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center flex-shrink-0 p-2">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2 leading-tight">
                    {item.title}
                  </p>
                  <p className="text-primary-600 dark:text-primary-400 font-bold mt-1">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    {/* Qty controls */}
                    <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                      <button
                        id={`qty-dec-${item.id}`}
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {item.qty}
                      </span>
                      <button
                        id={`qty-inc-${item.id}`}
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        className="w-7 h-7 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                    <button
                      id={`remove-item-${item.id}`}
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400 font-medium">Subtotal</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
            </div>
            <button
              id="checkout-btn"
              onClick={handleCheckout}
              className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-base"
            >
              Proceed to Checkout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <p className="text-center text-xs text-gray-400">Free shipping on all orders 🎉</p>
          </div>
        )}
      </aside>
    </>
  );
}
