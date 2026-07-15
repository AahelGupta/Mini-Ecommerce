export default function Hero({ onShopNow }) {
  return (
    <section className="hero" id="hero-section">
      {/* Animated background shapes */}
      <div className="hero-shapes" aria-hidden="true">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <div className="hero-inner">
        {/* Left: Content */}
        <div className="hero-content">
          <div className="hero-badge">
            <span>✦</span> New Arrivals Every Day
          </div>

          <h1 className="hero-title">
            Shop the{' '}
            <span className="gradient-text">Future</span>
            <br />of Retail
          </h1>

          <p className="hero-subtitle">
            Discover thousands of curated products — from cutting-edge electronics
            to timeless jewellery. The best prices, delivered fast.
          </p>

          <div className="hero-cta-group">
            <button
              className="btn-primary btn-primary-lg"
              id="hero-shop-btn"
              onClick={onShopNow}
            >
              Explore Products
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
            <button className="btn-ghost" id="hero-deals-btn" onClick={onShopNow}>
              View Deals
            </button>
          </div>

          <div className="hero-stats" role="list" aria-label="Store statistics">
            <div className="stat" role="listitem">
              <span className="stat-num">20+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat" role="listitem">
              <span className="stat-num">98%</span>
              <span className="stat-label">Satisfaction</span>
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat" role="listitem">
              <span className="stat-num">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orb" />
          <div className="hero-float-card card-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            <span>Free Shipping</span>
          </div>
          <div className="hero-float-card card-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span>Secure Pay</span>
          </div>
        </div>
      </div>
    </section>
  );
}
