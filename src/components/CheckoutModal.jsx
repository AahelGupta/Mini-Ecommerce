import { useState, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

const STEPS = ['Summary', 'Shipping', 'Payment'];

function StepIndicator({ current }) {
  return (
    <>
      <div className="checkout-steps">
        {STEPS.map((label, i) => {
          const num = i + 1;
          const isDone = num < current;
          const isActive = num === current;
          return (
            <div key={label} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
              <div className={`step-bubble${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}>
                {isDone ? '✓' : num}
              </div>
              {i < STEPS.length - 1 && (
                <div className={`step-connector${isDone ? ' done' : ''}`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="step-labels">
        {STEPS.map((label, i) => {
          const num = i + 1;
          return (
            <span key={label} className={`step-label${num === current ? ' active' : ''}${num < current ? ' done' : ''}`}>
              {label}
            </span>
          );
        })}
      </div>
    </>
  );
}

export default function CheckoutModal({ isOpen, onClose, onSuccess }) {
  const { items, totalPrice, clearCart } = useCart();
  const { addToast } = useToast();
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '', email: '', address: '', city: '', zip: '', country: ''
  });
  const [payment, setPayment] = useState({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
  const [errors, setErrors] = useState({});

  const close = useCallback(() => {
    setStep(1);
    setErrors({});
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  // Validate shipping
  const validateShipping = () => {
    const e = {};
    if (!shipping.firstName.trim()) e.firstName = true;
    if (!shipping.lastName.trim())  e.lastName  = true;
    if (!shipping.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = true;
    if (!shipping.address.trim())   e.address   = true;
    if (!shipping.city.trim())      e.city      = true;
    if (!shipping.zip.trim())       e.zip       = true;
    if (!shipping.country)          e.country   = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Validate payment
  const validatePayment = () => {
    const e = {};
    if (!payment.cardName.trim())    e.cardName   = true;
    if (payment.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = true;
    if (!payment.expiry.match(/^\d{2}\s?\/\s?\d{2}$/))    e.expiry     = true;
    if (payment.cvv.length < 3)      e.cvv        = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validatePayment()) { addToast('Please fix the highlighted fields', 'error'); return; }
    clearCart();
    close();
    onSuccess();
  };

  const formatCard = (val) => val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  const formatExpiry = (val) => {
    const d = val.replace(/\D/g, '').slice(0, 4);
    if (d.length >= 3) return `${d.slice(0, 2)} / ${d.slice(2)}`;
    return d;
  };

  return (
    <div className="modal-overlay" id="checkout-overlay" onClick={e => e.target === e.currentTarget && close()}>
      <div className="checkout-modal" id="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
        <button className="modal-close-btn" id="checkout-close" onClick={close} aria-label="Close checkout">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <StepIndicator current={step} />

        {/* ── Step 1: Summary ── */}
        <div className={`checkout-panel${step === 1 ? ' active' : ''}`} id="checkout-panel-1">
          <h2 id="checkout-title">Order Summary</h2>
          <div className="order-items-list">
            {items.map(item => (
              <div className="order-item" key={item.id}>
                <div className="oi-img">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="oi-info">
                  <p className="oi-title">{item.title}</p>
                  <p className="oi-qty">Qty: {item.qty}</p>
                </div>
                <span className="oi-price">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-totals">
            <div className="order-row"><span>Subtotal</span><span id="summary-subtotal">${totalPrice.toFixed(2)}</span></div>
            <div className="order-row"><span>Shipping</span><span className="free-tag">FREE</span></div>
            <div className="order-row grand"><span>Grand Total</span><span id="summary-total">${totalPrice.toFixed(2)}</span></div>
          </div>
          <button className="btn-primary full-w" id="step1-next" onClick={() => setStep(2)}>
            Continue to Shipping
          </button>
        </div>

        {/* ── Step 2: Shipping ── */}
        <div className={`checkout-panel${step === 2 ? ' active' : ''}`} id="checkout-panel-2">
          <h2>Shipping Details</h2>
          <form className="checkout-form" id="shipping-form" onSubmit={e => {
            e.preventDefault();
            if (validateShipping()) setStep(3);
          }}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first-name">First Name *</label>
                <input id="first-name" type="text" placeholder="John" required
                  className={errors.firstName ? 'error' : ''}
                  value={shipping.firstName}
                  onChange={e => setShipping(s => ({ ...s, firstName: e.target.value }))} />
              </div>
              <div className="form-group">
                <label htmlFor="last-name">Last Name *</label>
                <input id="last-name" type="text" placeholder="Doe" required
                  className={errors.lastName ? 'error' : ''}
                  value={shipping.lastName}
                  onChange={e => setShipping(s => ({ ...s, lastName: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input id="email" type="email" placeholder="john@example.com" required
                className={errors.email ? 'error' : ''}
                value={shipping.email}
                onChange={e => setShipping(s => ({ ...s, email: e.target.value }))} />
            </div>
            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input id="address" type="text" placeholder="123 Main Street" required
                className={errors.address ? 'error' : ''}
                value={shipping.address}
                onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input id="city" type="text" placeholder="New York" required
                  className={errors.city ? 'error' : ''}
                  value={shipping.city}
                  onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} />
              </div>
              <div className="form-group">
                <label htmlFor="zip">ZIP Code *</label>
                <input id="zip" type="text" placeholder="10001" required
                  className={errors.zip ? 'error' : ''}
                  value={shipping.zip}
                  onChange={e => setShipping(s => ({ ...s, zip: e.target.value }))} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <select id="country" required className={errors.country ? 'error' : ''}
                value={shipping.country}
                onChange={e => setShipping(s => ({ ...s, country: e.target.value }))}>
                <option value="">Select country…</option>
                <option value="US">United States</option>
                <option value="IN">India</option>
                <option value="GB">United Kingdom</option>
                <option value="CA">Canada</option>
                <option value="AU">Australia</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <div className="form-btn-row">
              <button type="button" className="btn-ghost" id="step2-back" onClick={() => setStep(1)}>Back</button>
              <button type="submit" className="btn-primary">Continue to Payment</button>
            </div>
          </form>
        </div>

        {/* ── Step 3: Payment ── */}
        <div className={`checkout-panel${step === 3 ? ' active' : ''}`} id="checkout-panel-3">
          <h2>Payment Details</h2>
          <form className="checkout-form" id="payment-form" onSubmit={e => { e.preventDefault(); handlePlaceOrder(); }}>
            <div className="form-group">
              <label htmlFor="card-name">Cardholder Name *</label>
              <input id="card-name" type="text" placeholder="John Doe" required
                className={errors.cardName ? 'error' : ''}
                value={payment.cardName}
                onChange={e => setPayment(p => ({ ...p, cardName: e.target.value }))} />
            </div>
            <div className="form-group">
              <label htmlFor="card-number">Card Number *</label>
              <input id="card-number" type="text" placeholder="4242 4242 4242 4242" maxLength="19" required
                className={errors.cardNumber ? 'error' : ''}
                value={payment.cardNumber}
                onChange={e => setPayment(p => ({ ...p, cardNumber: formatCard(e.target.value) }))} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="card-expiry">Expiry *</label>
                <input id="card-expiry" type="text" placeholder="MM / YY" maxLength="7" required
                  className={errors.expiry ? 'error' : ''}
                  value={payment.expiry}
                  onChange={e => setPayment(p => ({ ...p, expiry: formatExpiry(e.target.value) }))} />
              </div>
              <div className="form-group">
                <label htmlFor="card-cvv">CVV *</label>
                <input id="card-cvv" type="text" placeholder="123" maxLength="3" required
                  className={errors.cvv ? 'error' : ''}
                  value={payment.cvv}
                  onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '') }))} />
              </div>
            </div>
            <div className="pay-security">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Your payment is SSL-encrypted and secure
            </div>
            <div className="form-btn-row">
              <button type="button" className="btn-ghost" id="step3-back" onClick={() => setStep(2)}>Back</button>
              <button type="submit" className="btn-primary" id="place-order-btn">
                Place Order 🎉
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
