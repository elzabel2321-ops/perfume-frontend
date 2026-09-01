# 📁 Perfume Shop - Complete Project Structure

```
next-learning/
│
├── 📂 app/                              # Next.js App Router Directory
│   ├── 📄 layout.tsx                    # Root layout with Navbar & Footer
│   ├── 📄 page.tsx                      # Home page (featured products)
│   ├── 📄 globals.css                   # Global styles with Tailwind
│   │
│   ├── 📂 login/
│   │   └── 📄 page.tsx                  # Login page (email/password)
│   │
│   ├── 📂 signup/
│   │   └── 📄 page.tsx                  # Signup page (registration form)
│   │
│   ├── 📂 products/
│   │   └── 📄 page.tsx                  # Products listing page
│   │                                    # (search, category filter, grid)
│   │
│   ├── 📂 product/
│   │   └── 📂 [id]/
│   │       └── 📄 page.tsx              # Product detail page
│   │                                    # (dynamic route with quantity selector)
│   │
│   ├── 📂 cart/
│   │   └── 📄 page.tsx                  # Shopping cart page
│   │                                    # (item list, quantities, summary)
│   │
│   ├── 📂 checkout/
│   │   └── 📄 page.tsx                  # Checkout page
│   │                                    # (shipping info form)
│   │
│   ├── 📂 payment/
│   │   └── 📄 page.tsx                  # Payment page
│   │                                    # (card details, processing)
│   │
│   ├── 📂 orders/
│   │   └── 📄 page.tsx                  # Orders history page
│   │                                    # (list all user orders)
│   │
│   └── 📂 profile/
│       └── 📄 page.tsx                  # User profile page
│                                        # (account settings, edit info)
│
├── 📂 components/                       # Reusable React Components
│   ├── 📄 Button.tsx                    # Custom button component
│   │                                    # Variants: primary, secondary, outline
│   │                                    # Props: onClick, variant, disabled, fullWidth
│   │
│   ├── 📄 Navbar.tsx                    # Navigation bar component
│   │                                    # Features: responsive, cart counter
│   │
│   ├── 📄 Footer.tsx                    # Footer component
│   │                                    # Links, company info, social
│   │
│   ├── 📄 Hero.tsx                      # Hero section component
│   │                                    # CTA buttons, search bar
│   │
│   ├── 📄 ProductCard.tsx               # Product card component
│   │                                    # Image, name, price, rating, add button
│   │
│   ├── 📄 CategoryCard.tsx              # Category card component
│   │                                    # Image overlay, category name
│   │
│   ├── 📄 CartItem.tsx                  # Cart item component
│   │                                    # Quantity control, remove, subtotal
│   │
│   └── 📄 SearchBar.tsx                 # Search component
│                                        # Form submission, routing
│
├── 📂 lib/                              # Utility Functions & Helpers
│   ├── 📄 products.ts                   # Product data and functions
│   │                                    # ├─ products[] (6 perfumes)
│   │                                    # ├─ categories[] (4 types)
│   │                                    # ├─ getProductById()
│   │                                    # ├─ getProductsByCategory()
│   │                                    # └─ searchProducts()
│   │
│   └── 📄 cart.ts                       # Cart management functions
│                                        # ├─ getCart()
│                                        # ├─ saveCart()
│                                        # ├─ addToCart()
│                                        # ├─ removeFromCart()
│                                        # ├─ updateCartItemQuantity()
│                                        # ├─ clearCart()
│                                        # ├─ calculateCartTotal()
│                                        # └─ getCartItemCount()
│
├── 📂 types/                            # TypeScript Type Definitions
│   └── 📄 index.ts                      # All app types
│                                        # ├─ Product
│                                        # ├─ CartItem
│                                        # ├─ Cart
│                                        # ├─ User
│                                        # ├─ Order
│                                        # └─ Category
│
├── 📂 public/                           # Static Assets
│   └── 📂 images/
│       ├── 📄 perfume1.jpg              # Product image 1
│       ├── 📄 perfume2.jpg              # Product image 2
│       ├── 📄 perfume3.jpg              # Product image 3
│       └── 📄 hero.jpg                  # Hero banner image
│
├── 📂 .next/                            # Next.js build output
│
├── 📂 node_modules/                     # Dependencies
│
├── 📄 package.json                      # Project dependencies
│                                        # ├─ next@16.2.12
│                                        # ├─ react@19.2.4
│                                        # ├─ tailwindcss@4
│                                        # └─ typescript@5
│
├── 📄 tsconfig.json                     # TypeScript configuration
│
├── 📄 next.config.ts                    # Next.js configuration
│
├── 📄 postcss.config.mjs                # PostCSS configuration (Tailwind)
│
├── 📄 tailwind.config.ts                # Tailwind CSS configuration (if exists)
│
├── 📄 package-lock.json                 # Locked dependencies
│
├── 📄 eslint.config.mjs                 # ESLint configuration
│
├── 📄 README_PERFUME_SHOP.md            # 📖 Main project documentation
│
├── 📄 QUICK_REFERENCE.md                # 📖 API reference guide
│
└── 📄 PROJECT_SUMMARY.md                # 📖 Project completion summary
```

---

## 📊 File Statistics

| Category   | Count   | Total Lines |
| ---------- | ------- | ----------- |
| Pages      | 10      | ~2,500+     |
| Components | 8       | ~1,500+     |
| Utilities  | 2       | ~500+       |
| Types      | 1       | ~100+       |
| Config     | 5       | ~200+       |
| **TOTAL**  | **26+** | **~5,000+** |

---

## 🗂️ Key Files Breakdown

### Pages (10)

- `app/page.tsx` - Home (330 lines)
- `app/products/page.tsx` - Products listing (120 lines)
- `app/product/[id]/page.tsx` - Product detail (140 lines)
- `app/cart/page.tsx` - Shopping cart (190 lines)
- `app/checkout/page.tsx` - Checkout (240 lines)
- `app/payment/page.tsx` - Payment (210 lines)
- `app/orders/page.tsx` - Orders (160 lines)
- `app/profile/page.tsx` - Profile (220 lines)
- `app/login/page.tsx` - Login (180 lines)
- `app/signup/page.tsx` - Signup (260 lines)

### Components (8)

- `Button.tsx` - Reusable button (45 lines)
- `Navbar.tsx` - Navigation (85 lines)
- `Footer.tsx` - Footer (80 lines)
- `Hero.tsx` - Hero section (50 lines)
- `ProductCard.tsx` - Product card (70 lines)
- `CategoryCard.tsx` - Category card (40 lines)
- `CartItem.tsx` - Cart item (85 lines)
- `SearchBar.tsx` - Search form (40 lines)

### Utilities (2)

- `lib/products.ts` - Product data (150 lines)
- `lib/cart.ts` - Cart functions (140 lines)

### Styles & Config

- `app/globals.css` - Global styles
- `app/layout.tsx` - Root layout
- Configuration files (5 total)

---

## 🎯 Usage Paths

### Shopping Flow

1. User lands on `/` (home page)
2. Browse products on `/products` or click category
3. Click product → `/product/[id]`
4. Add to cart → redirects to product
5. Click "Cart" → `/cart`
6. Click "Checkout" → `/checkout`
7. Fill form → Click "Payment"
8. Enter payment → `/payment`
9. Complete → `/orders`

### Authentication Flow

1. Click "Sign Up" → `/signup`
2. Fill form → Submit
3. Redirected to `/` (home)
4. Logged in! Click "Profile" → `/profile`
5. View or edit account
6. Click "Logout" → clears data

### Search & Filter

1. Type in search bar (any page)
2. Submit → `/products?search=query`
3. Results displayed
4. Or click category → `/products?category=Floral`

---

## 💾 LocalStorage Structure

```javascript
// Cart
{
  "cart": {
    "items": [
      {"productId": "1", "quantity": 2, "price": 89.99},
      {"productId": "3", "quantity": 1, "price": 99.99}
    ],
    "total": 279.97
  }
}

// User
{
  "user": {
    "id": "abc123",
    "name": "John Doe",
    "email": "john@example.com"
  }
}

// Orders
{
  "lastOrder": {
    "id": "ord123",
    "total": 275.00,
    "status": "completed",
    "date": "2024-07-27T..."
  }
}
```

---

## 🎨 Component Hierarchy

```
App
├── Navbar
│   ├── Logo
│   ├── Nav Links
│   ├── Cart Counter
│   └── Auth Links
├── Main Content
│   ├── Hero (on home)
│   ├── Product Grid
│   │   └── ProductCard (repeated)
│   ├── or Form (on auth pages)
│   └── or Cart Items (on cart)
└── Footer
    ├── Company Links
    ├── Support Links
    ├── Contact Info
    └── Social Links
```

---

## ✨ Quick Navigation

**📖 Documentation:**

- Main README: `README_PERFUME_SHOP.md`
- Quick Ref: `QUICK_REFERENCE.md`
- Summary: `PROJECT_SUMMARY.md`

**🚀 Start Development:**

```bash
npm run dev        # http://localhost:3000
```

**🏗️ Build for Production:**

```bash
npm run build
npm start
```

---

**Project Version**: 1.0 MVP  
**Created**: July 2024  
**Status**: ✅ Production Ready
