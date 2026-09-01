# 🌸 Perfume Shop - Next.js E-Commerce MVP

A modern, fully functional e-commerce application for luxury perfumes built with **Next.js 16**, **React 19**, and **TypeScript**. This MVP features a complete shopping experience with product browsing, cart management, checkout, and user profiles.

## 📦 Project Structure

```
next-learning/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout with Navbar & Footer
│   ├── page.tsx                   # Home page
│   ├── globals.css                # Global styles with Tailwind
│   │
│   ├── login/
│   │   └── page.tsx              # User login page
│   │
│   ├── signup/
│   │   └── page.tsx              # User registration page
│   │
│   ├── products/
│   │   └── page.tsx              # Products listing with search & filter
│   │
│   ├── product/[id]/
│   │   └── page.tsx              # Product detail page with quantity selector
│   │
│   ├── cart/
│   │   └── page.tsx              # Shopping cart with item management
│   │
│   ├── checkout/
│   │   └── page.tsx              # Shipping information form
│   │
│   ├── payment/
│   │   └── page.tsx              # Payment form with card processing
│   │
│   ├── orders/
│   │   └── page.tsx              # Order history page
│   │
│   └── profile/
│       └── page.tsx              # User profile management
│
├── components/                    # Reusable React components
│   ├── Button.tsx                # Custom button component with variants
│   ├── Navbar.tsx                # Navigation bar with cart counter
│   ├── Footer.tsx                # Footer with links and info
│   ├── Hero.tsx                  # Hero section with search
│   ├── ProductCard.tsx           # Product card component
│   ├── ProductCard.tsx           # Product listing card
│   ├── CategoryCard.tsx          # Category card for browsing
│   ├── CartItem.tsx              # Cart item with quantity control
│   └── SearchBar.tsx             # Search functionality component
│
├── lib/                           # Utility functions & helpers
│   ├── products.ts               # Product data & product queries
│   └── cart.ts                   # Cart management utilities
│
├── types/                         # TypeScript type definitions
│   └── index.ts                  # All application types
│
├── public/                        # Static assets
│   └── images/                   # Perfume product images
│
├── package.json                   # Dependencies
├── tsconfig.json                 # TypeScript configuration
└── next.config.ts                # Next.js configuration
```

## ✨ Features

### 🏠 Home Page

- Hero section with promotional banner
- Shop by category section
- Featured products display
- Special offer banner with discount code

### 🛍️ Products Page

- Product listing with grid layout
- Search functionality
- Category filtering
- Product sorting
- Responsive design

### 📄 Product Detail Page

- High-quality product image
- Detailed product information
- Ratings and reviews count
- Quantity selector
- Add to cart with feedback
- Product benefits section

### 🛒 Shopping Cart

- View all cart items
- Quantity adjustment
- Remove items from cart
- Real-time total calculation
- Clear cart option
- Continue shopping button
- Order summary with tax & shipping

### 📋 Checkout Page

- Shipping address form
- Multi-step form validation
- Order summary sidebar
- Address information collection
- Proceed to payment

### 💳 Payment Page

- Secure payment form
- Card number formatting
- Card validation fields
- Security badge
- Order processing

### ✅ Orders Page

- Order history
- Order details (ID, date, total, status)
- Order tracking option
- View order details

### 👤 Profile Page

- User account information
- Edit profile functionality
- Password management
- Two-factor authentication settings
- Quick links to orders and products
- Account status information
- Logout functionality

### 🔐 Authentication

- User signup with validation
- User login
- Local storage-based session management
- Protected profile page

## 🛠️ Technology Stack

- **Framework**: Next.js 16.2.12
- **Language**: TypeScript 5
- **UI Library**: React 19.2.4
- **Styling**: Tailwind CSS 4 + PostCSS
- **State Management**: React hooks with localStorage
- **Build Tool**: Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (installed)
- npm 9+

### Installation

1. Navigate to the project directory:

```bash
cd next-learning
```

2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## 📊 Data Management

### Products Database

Located in `lib/products.ts`:

- 6 premium perfume products with details
- Product search functionality
- Category-based filtering
- Product information: name, price, category, description, rating, reviews

### Cart System

Located in `lib/cart.ts`:

- LocalStorage-based persistent cart
- Add/remove items
- Update quantities
- Calculate totals
- Clear cart functionality

### User Data

- LocalStorage-based user storage
- User profile management
- Order history tracking

## 🎨 UI Components

### Button Component

- **Variants**: primary, secondary, outline
- **Props**: onClick, className, variant, disabled, type, fullWidth
- Consistent styling across the application

### Product Card

- Product image with hover effect
- Product name, category, rating
- Price display
- Add to cart button with feedback

### Navigation Bar

- Responsive mobile menu
- Cart counter
- Authentication links
- Quick navigation

## 💰 Pricing

All products have realistic pricing:

- **$69.99 - $119.99** price range
- Volume-based discounts available
- Free shipping on orders over $50
- Tax calculated at checkout

## 📱 Responsive Design

- **Mobile-first** approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Tailwind CSS responsive utilities
- Mobile navigation menu

## 🔄 User Flow

1. **Discovery**: Home → Browse Categories/Search
2. **Shopping**: Product List → Product Details → Add to Cart
3. **Checkout**: Cart Review → Shipping Info → Payment
4. **Order**: Order Confirmation → Track Order
5. **Account**: Profile Management → Order History

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎯 MVP Features Included

✅ Product Catalog  
✅ Search & Filter  
✅ Shopping Cart  
✅ User Authentication  
✅ Checkout Flow  
✅ Payment Processing  
✅ Order Management  
✅ User Profile  
✅ Product Details  
✅ Responsive Design  
✅ Category Navigation  
✅ Cart Persistence

## 🔮 Future Enhancements

- Backend API integration
- Real payment gateway (Stripe/PayPal)
- Database (PostgreSQL/MongoDB)
- User authentication with JWT
- Email notifications
- Product reviews & ratings
- Wishlist functionality
- Admin dashboard
- Inventory management
- Advanced search filters
- Product recommendations
- Social login
- Multiple payment methods

## 📧 Support

For support or questions, please contact: support@perfumeshop.com

## 📄 License

This project is part of the Next.js Learning series.

---

**Built with ✨ by Copilot CLI** | Next.js MVP 2024
