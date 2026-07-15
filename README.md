# ShopWave 🌊 — Mini E-Commerce App

ShopWave is a modern, responsive, and feature-rich React e-commerce web application. It integrates the [Fake Store API](https://fakestoreapi.com/) to fetch, display, and interact with products, providing users with a premium online shopping experience.

Built with **React**, **Vite**, and **Tailwind CSS**, it features a fully responsive layout, dynamic dark/light theme switching, cart management, wishlist storage, and a smooth checkout flow.

---

## ✨ Features

- 🛍️ **API-Driven Catalog**: Real-time product fetching from the Fake Store API.
- 🌓 **Dynamic Dark Mode**: Seamless dark and light theme switching with system preference detection.
- 🛒 **Interactive Shopping Cart**: Add/remove products, adjust quantities, and manage items in a sliding sidebar cart.
- ❤️ **Favorites / Wishlist**: Save items for later with persistent favorites/wishlist context.
- 🔍 **Category Filters**: Filter products instantly using categories like Electronics, Jewelery, Men's Clothing, and Women's Clothing.
- ⚡ **Lightning Fast HMR**: Developed using Vite for instant browser hot-reloading.
- 💳 **Checkout Flow**: Complete user checkout page with input validations and success feedback.
- 🍞 **Toast Notifications**: Interactive popup notifications for user actions (adding to cart, wishlist, etc.).

---

## 📁 Project Structure

Below is the directory layout of the ShopWave codebase:

```text
mini-ecommerce/
├── public/                  # Static assets accessible directly
└── src/
    ├── assets/              # App images and logo assets (Vite logo, Hero, etc.)
    ├── components/          # Reusable UI components
    │   ├── CartSidebar.jsx  # Slide-out shopping cart sidebar
    │   ├── CategoryBar.jsx  # Horizontal scrollable category icons list
    │   ├── CategoryFilter.jsx # Sidebar filters for category selection
    │   ├── CheckoutModal.jsx # Order confirmation and success summary
    │   ├── Hero.jsx         # Beautiful landing page hero banner
    │   ├── Navbar.jsx       # Main navigation header with theme/cart/wishlist links
    │   ├── ProductCard.jsx  # Individual product display card (Hover effects, wishlist button)
    │   ├── ProductGrid.jsx  # Responsive grid rendering list of products
    │   ├── SkeletonCard.jsx # Loading placeholder grid cards
    │   └── StarRating.jsx   # Numerical to graphical star converter
    ├── context/             # Global states / React Context Providers
    │   ├── CartContext.jsx  # Shopping cart state provider
    │   ├── ThemeContext.jsx # Light/dark mode state provider
    │   ├── ToastContext.jsx # Notification alert state provider
    │   └── WishlistContext.jsx # Wishlist/Favorites state provider
    ├── hooks/               # Custom React hooks
    │   ├── useProducts.js   # Fetches and filters products from Fake Store API
    │   └── useTheme.js      # Clean shortcut to ThemeContext
    ├── pages/               # Layout pages resolved by React Router
    │   ├── CheckoutPage.jsx # Checkout form & billing info
    │   ├── HomePage.jsx     # Main storefront page
    │   ├── ProductDetailPage.jsx # Individual detailed product view
    │   └── WishlistPage.jsx # Favorites listing page
    ├── App.css              # Custom global styles and Tailwind custom styles
    ├── App.jsx              # Main routing and provider wrapper
    ├── index.css            # Base Tailwind directive imports
    └── main.jsx             # React DOM root render entrypoint
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v16.0 or higher) installed on your machine.

### Installation

1. Navigate to the project directory:
   ```bash
   cd mini-ecommerce
   ```

2. Install the project dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Data Source**: [Fake Store API](https://fakestoreapi.com/)
