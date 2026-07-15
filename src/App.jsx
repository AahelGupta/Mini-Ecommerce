import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import WishlistPage from './pages/WishlistPage';

function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="font-bold text-gray-700 dark:text-gray-200">ShopWave</span>
        </div>
        <p className="text-sm text-gray-400">
          Built with ❤️ using React, Tailwind CSS & Fake Store API
        </p>
        <div className="flex gap-4 text-sm text-gray-400">
          <a href="https://fakestoreapi.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">API</a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">React</a>
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500 transition-colors">Tailwind</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                </Routes>
              </div>
              <Footer />
              <CartSidebar />
            </div>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
