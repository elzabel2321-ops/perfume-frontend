# Perfume Shop - Quick Reference Guide

## 🏗️ Type Definitions

All types are defined in `types/index.ts`:

### Product

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}
```

### CartItem

```typescript
interface CartItem {
  productId: string;
  quantity: number;
  price: number;
}
```

### Cart

```typescript
interface Cart {
  items: CartItem[];
  total: number;
}
```

### User

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  address?: string;
}
```

### Order

```typescript
interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'shipped' | 'delivered';
  createdAt: Date;
}
```

### Category

```typescript
interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}
```

## 📚 Utility Functions

### Cart Functions (lib/cart.ts)

```typescript
getCart(); // Get cart from localStorage
saveCart(cart); // Save cart to localStorage
addToCart(productId, price, quantity); // Add item to cart
removeFromCart(productId); // Remove item from cart
updateCartItemQuantity(productId, qty); // Update quantity
clearCart(); // Clear all items
calculateCartTotal(items); // Calculate total price
getCartItemCount(); // Get total item count
```

### Product Functions (lib/products.ts)

```typescript
products[]                             // Array of all products
categories[]                           // Array of all categories
getProductById(id)                     // Get product by ID
getProductsByCategory(category)        // Filter by category
searchProducts(query)                  // Search products
```

## 🎨 Component Props

### Button Component

```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}
```

### ProductCard Component

```typescript
interface ProductCardProps {
  product: Product;
}
```

### CategoryCard Component

```typescript
interface CategoryCardProps {
  category: Category;
}
```

### CartItem Component

```typescript
interface CartItemProps {
  item: CartItem;
  onUpdate?: () => void;
}
```

## 🌐 API Routes Map

| Route           | Method   | Component             | Features                           |
| --------------- | -------- | --------------------- | ---------------------------------- |
| `/`             | GET      | page.tsx              | Home page with featured products   |
| `/products`     | GET      | products/page.tsx     | Product listing with search/filter |
| `/product/[id]` | GET      | product/[id]/page.tsx | Product details page               |
| `/cart`         | GET      | cart/page.tsx         | Shopping cart management           |
| `/checkout`     | GET/POST | checkout/page.tsx     | Shipping information               |
| `/payment`      | GET/POST | payment/page.tsx      | Payment processing                 |
| `/orders`       | GET      | orders/page.tsx       | Order history                      |
| `/profile`      | GET/POST | profile/page.tsx      | User profile management            |
| `/login`        | GET/POST | login/page.tsx        | User authentication                |
| `/signup`       | GET/POST | signup/page.tsx       | User registration                  |

## 💾 Local Storage Keys

```javascript
localStorage.getItem('cart'); // Current shopping cart
localStorage.getItem('user'); // Current user info
localStorage.getItem('checkoutData'); // Checkout information
localStorage.getItem('lastOrder'); // Last placed order
```

## 🎯 Product Sample Data

6 Premium Perfumes:

1. **Essence of Roses** - $89.99 (Floral)
2. **Ocean Breeze** - $79.99 (Fresh)
3. **Midnight Elegance** - $99.99 (Oriental)
4. **Vanilla Dream** - $69.99 (Sweet)
5. **Lavender Fields** - $75.99 (Floral)
6. **Gold Standard** - $119.99 (Luxury)

## 📊 Categories

- Floral: Romantic and elegant fragrances
- Fresh: Light and energizing scents
- Oriental: Sensual and warm fragrances
- Sweet: Sweet and playful scents

## 🎨 Color Scheme

- **Primary**: Purple (#9333ea)
- **Secondary**: Pink (#ec4899)
- **Background**: Light Gray (#f3f4f6)
- **Text**: Dark Gray (#1f2937)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)

## 🔐 Authentication Flow

1. **Sign Up**: Create new account → Store in localStorage
2. **Login**: Enter credentials → Verify & Store user
3. **Session**: Check localStorage on profile page
4. **Logout**: Clear user from localStorage

## 🛒 Shopping Flow

1. **Browse**: Home/Products page
2. **View Details**: Click product → See details
3. **Add to Cart**: Select quantity → Add
4. **Review Cart**: View/edit items
5. **Checkout**: Enter shipping info
6. **Payment**: Process payment
7. **Confirmation**: View order confirmation
8. **Orders**: Track order status

## 📱 Responsive Breakpoints

- **Mobile**: 0px - 639px
- **Tablet**: 640px - 1023px
- **Desktop**: 1024px+

## 🚀 Performance Tips

- Images are optimized with Next.js Image component
- Lazy loading enabled for product images
- Static generation for pages where possible
- Dynamic routes for product details
- Client-side state management with hooks

## 🧪 Testing Credentials

**Demo User for Login:**

- Email: demo@perfumeshop.com
- Password: (any password works in MVP)

## 📖 File Size References

- **Navbar.tsx**: ~2.4 KB
- **ProductCard.tsx**: ~2 KB
- **products.ts**: ~2.5 KB
- **cart.ts**: ~2 KB
- **Hero.tsx**: ~1.3 KB
- **pages**: ~3-7 KB each

## 🔄 State Management

All state is managed client-side using:

- **React Hooks**: useState, useEffect
- **localStorage**: Persistent storage
- **URL params**: For search & filters
- **Dynamic routing**: For product details

## 📊 Shopping Cart Example

```javascript
// Add item to cart
addToCart('1', 89.99, 1);

// Cart structure in localStorage
{
  items: [
    { productId: '1', quantity: 1, price: 89.99 }
  ],
  total: 89.99
}

// Remove item
removeFromCart('1');

// Update quantity
updateCartItemQuantity('1', 2);
```

## 🎯 Key Features Breakdown

| Feature         | Status | Notes                       |
| --------------- | ------ | --------------------------- |
| Product Catalog | ✅     | 6 sample products           |
| Shopping Cart   | ✅     | Persistent via localStorage |
| Search          | ✅     | Full-text search            |
| Categories      | ✅     | 4 categories                |
| Checkout        | ✅     | Multi-step form             |
| Payment Form    | ✅     | Simulated processing        |
| User Auth       | ✅     | Basic signup/login          |
| Profiles        | ✅     | User profile management     |
| Orders          | ✅     | Order history tracking      |
| Responsive      | ✅     | Mobile-friendly             |

---

**Created**: July 2024 | **Version**: 1.0 MVP
