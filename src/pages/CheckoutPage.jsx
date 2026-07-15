import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { items, total, clearCart, updateQty, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '', card: '' });
  const [errors, setErrors] = useState({});

  const shipping = total > 50 ? 0 : 4.99;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required';
    if (!form.address.trim()) errs.address = 'Address is required';
    if (!form.card.trim() || form.card.replace(/\s/g, '').length < 16) errs.card = 'Valid card number required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 300);
  };

  if (placed) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center animate-bounce-in space-y-6 max-w-md">
          <div className="w-28 h-28 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Order Placed! 🎉</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Thank you, <strong className="text-gray-700 dark:text-gray-200">{form.name}</strong>! Your order has been confirmed and will be shipped to your address.
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Confirmation #</span>
              <span className="font-mono font-semibold text-primary-500">SW-{Math.random().toString(36).substr(2, 8).toUpperCase()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Paid</span>
              <span className="font-bold text-gray-900 dark:text-white">${orderTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Delivery to</span>
              <span className="font-medium text-gray-700 dark:text-gray-200 text-right max-w-[60%]">{form.email}</span>
            </div>
          </div>
          <button
            id="continue-shopping"
            onClick={() => navigate('/')}
            className="btn-primary w-full py-3 text-base"
          >
            Continue Shopping
          </button>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="text-6xl">🛒</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your cart is empty</h1>
          <p className="text-gray-500">Add some products before checking out.</p>
          <button onClick={() => navigate('/')} className="btn-primary">Browse Products</button>
        </div>
      </main>
    );
  }

  const field = (id, label, type, placeholder, key, extra = {}) => (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={e => {
          setForm(f => ({ ...f, [key]: e.target.value }));
          if (errors[key]) setErrors(er => ({ ...er, [key]: undefined }));
        }}
        className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition
          ${errors[key] ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 dark:border-gray-700'}`}
        {...extra}
      />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout</h1>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          {/* Contact */}
          <section className="card p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary-500 text-white text-sm flex items-center justify-center font-bold">1</span>
              Contact Information
            </h2>
            {field('checkout-name', 'Full Name', 'text', 'John Doe', 'name')}
            {field('checkout-email', 'Email Address', 'email', 'john@example.com', 'email')}
          </section>

          {/* Shipping */}
          <section className="card p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary-500 text-white text-sm flex items-center justify-center font-bold">2</span>
              Shipping Address
            </h2>
            {field('checkout-address', 'Full Address', 'text', '123 Main St, City, Country', 'address')}
          </section>

          {/* Payment */}
          <section className="card p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-primary-500 text-white text-sm flex items-center justify-center font-bold">3</span>
              Payment Details
            </h2>
            {field('checkout-card', 'Card Number', 'text', '1234 5678 9012 3456', 'card', {
              maxLength: 19,
              onChange: (e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                const formatted = val.replace(/(.{4})/g, '$1 ').trim();
                setForm(f => ({ ...f, card: formatted }));
                if (errors.card) setErrors(er => ({ ...er, card: undefined }));
              }
            })}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Expiry Date</label>
                <input type="text" placeholder="MM / YY" maxLength={7} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">CVV</label>
                <input type="password" placeholder="•••" maxLength={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition" />
              </div>
            </div>
          </section>

          <button
            id="place-order-btn"
            type="submit"
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Place Order — ${orderTotal.toFixed(2)}
          </button>
        </form>

        {/* Order Summary */}
        <aside className="lg:col-span-2 space-y-4">
          <div className="card p-6 space-y-4 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Order Summary</h2>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 p-1.5">
                    <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 dark:text-gray-300 line-clamp-2">{item.title}</p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-5 h-5 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition text-xs">−</button>
                        <span className="text-xs font-semibold w-4 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-5 h-5 rounded-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition text-xs">+</button>
                      </div>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-500 transition-colors mt-0.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-500 font-semibold' : ''}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white border-t border-gray-100 dark:border-gray-800 pt-2 mt-2">
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            {total <= 50 && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
                💡 Add <strong>${(50 - total).toFixed(2)}</strong> more to get free shipping!
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
