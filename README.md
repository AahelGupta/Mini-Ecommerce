<div align="center">

  ![Capsule Header](https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,100:EC4899&height=180&section=header&text=Mini%20Ecommerce%20Storefront&fontSize=42&animation=twinkling&desc=Responsive%20React.js%20and%20Tailwind%20CSS%20Shopping%20Platform)

  <br/>

  [![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

</div>

<br/>

## 🛍️ Overview

**Mini-Ecommerce** is a responsive e-commerce web storefront built with **React.js**, **Tailwind CSS**, and **Vite**. It features product category filters, a dynamic shopping cart drawer, wishlist persistence, toast notifications, and checkout flow simulation.

---

## ✨ Key Features

- 🛒 **Interactive Cart & Wishlist**: Global state context managing real-time item quantity counters and total calculation.
- 🎨 **Responsive UI & Themes**: Tailwind CSS styled layout with dark/light mode context.
- 🔍 **Filtering & Search**: Category filtering, product search, and skeleton loading cards.
- 💳 **Checkout Workflow**: Multi-step checkout modal with address & payment validation.

---

## 🛠️ Project Structure

```
Mini-Ecommerce/
├── public/                 # Static SVG icons & favicon
├── src/
│   ├── components/         # CartSidebar, ProductGrid, Navbar, CheckoutModal
│   ├── context/            # CartContext, ThemeContext, WishlistContext, ToastContext
│   ├── hooks/              # Custom hooks (useProducts, useTheme)
│   └── pages/              # HomePage, ProductDetailPage, CheckoutPage, WishlistPage
├── package.json
└── README.md
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/AahelGupta/Mini-Ecommerce.git

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
