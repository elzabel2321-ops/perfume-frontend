import { Cart, CartItem } from "@/types";

// ==========================================
// CART STORAGE KEY
// ==========================================

const CART_KEY = "cart";

// ==========================================
// GET CART
// ==========================================

export const getCart = (): Cart => {
  // Server side
  if (typeof window === "undefined") {
    return {
      items: [],
      total: 0,
    };
  }

  const savedCart = localStorage.getItem(CART_KEY);

  // No cart found
  if (!savedCart) {
    return {
      items: [],
      total: 0,
    };
  }

  try {
    const cart = JSON.parse(savedCart);

    return {
      items: Array.isArray(cart.items) ? cart.items : [],
      total: Number(cart.total) || 0,
    };
  } catch {
    return {
      items: [],
      total: 0,
    };
  }
};

// ==========================================
// SAVE CART
// ==========================================

export const saveCart = (cart: Cart): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // Notify Navbar and other components
  window.dispatchEvent(new Event("cartUpdated"));
};

// ==========================================
// ADD TO CART
// ==========================================

export const addToCart = (
  productId: string,
  price: number,
  quantity: number = 1,
  extras: { name?: string; image?: string } = {}
): Cart => {
  const cart = getCart();

  const existingItem = cart.items.find(
    (item) => item.productId === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.price = Number(price);
    if (extras.name) existingItem.name = extras.name;
    if (extras.image) existingItem.image = extras.image;
  } else {
    cart.items.push({
      productId,
      quantity,
      price: Number(price),
      name: extras.name,
      image: extras.image,
    });
  }

  cart.total = calculateCartTotal(cart.items);

  saveCart(cart);

  return cart;
};

// ==========================================
// REMOVE FROM CART
// ==========================================

export const removeFromCart = (
  productId: string
): Cart => {
  const cart = getCart();

  cart.items = cart.items.filter(
    (item) => item.productId !== productId
  );

  cart.total = calculateCartTotal(cart.items);

  saveCart(cart);

  return cart;
};

// ==========================================
// UPDATE CART ITEM QUANTITY
// ==========================================

export const updateCartItemQuantity = (
  productId: string,
  quantity: number
): Cart => {
  const cart = getCart();

  const item = cart.items.find(
    (item) => item.productId === productId
  );

  if (item) {
    if (quantity <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId !== productId
      );
    } else {
      item.quantity = quantity;
    }
  }

  cart.total = calculateCartTotal(cart.items);

  saveCart(cart);

  return cart;
};

// ==========================================
// CLEAR CART
// ==========================================

export const clearCart = (): Cart => {
  const emptyCart: Cart = {
    items: [],
    total: 0,
  };

  saveCart(emptyCart);

  return emptyCart;
};

// ==========================================
// CALCULATE CART TOTAL
// ==========================================

export const calculateCartTotal = (
  items: CartItem[]
): number => {
  const total = items.reduce(
    (sum, item) =>
      sum +
      Number(item.price) * Number(item.quantity),
    0
  );

  return Number(total.toFixed(2));
};

// ==========================================
// GET CART ITEM COUNT
// ==========================================

export const getCartItemCount = (): number => {
  const cart = getCart();

  return cart.items.reduce(
    (count, item) =>
      count + Number(item.quantity),
    0
  );
};