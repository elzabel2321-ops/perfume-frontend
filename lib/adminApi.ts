import { apiFetch } from "./api";

export const adminApi = {
  // ==========================================
  // PRODUCTS
  // ==========================================

  products: (token: string) =>
    apiFetch("/api/admin/products", {
      method: "GET",
      token,
    }),

  product: (id: string, token: string) =>
    apiFetch(`/api/admin/products/${id}`, {
      method: "GET",
      token,
    }),

  createProduct: (
    product: {
      name: string;
      brand: string;
      description: string;
      price: number;
      image?: string;
      category: string;
      stock?: number;
    },
    token: string
  ) =>
    apiFetch("/api/admin/products", {
      method: "POST",
      token,
      body: JSON.stringify(product),
    }),

  updateProduct: (
    id: string,
    product: {
      name?: string;
      brand?: string;
      description?: string;
      price?: number;
      image?: string;
      category?: string;
      stock?: number;
    },
    token: string
  ) =>
    apiFetch(`/api/admin/products/${id}`, {
      method: "PUT",
      token,
      body: JSON.stringify(product),
    }),

  deleteProduct: (
    id: string,
    token: string
  ) =>
    apiFetch(`/api/admin/products/${id}`, {
      method: "DELETE",
      token,
    }),

  // ==========================================
  // ORDERS
  // ==========================================

  orders: (token: string, query = "") =>
    apiFetch(`/api/admin/orders${query}`, {
      method: "GET",
      token,
    }),

  order: (id: string, token: string) =>
    apiFetch(`/api/admin/orders/${id}`, {
      method: "GET",
      token,
    }),

  updateOrderStatus: (
    id: string,
    status: string,
    token: string
  ) =>
    apiFetch(`/api/admin/orders/${id}/status`, {
      method: "PUT",
      token,
      body: JSON.stringify({ status }),
    }),

  dashboard: (token: string) =>
    apiFetch("/api/admin/dashboard", {
      method: "GET",
      token,
    }),

  // ==========================================
  // CUSTOMERS
  // ==========================================

  customers: (token: string) =>
    apiFetch("/api/admin/customers", {
      method: "GET",
      token,
    }),

  // ==========================================
  // INVENTORY
  // ==========================================

  inventory: (token: string) =>
    apiFetch("/api/admin/inventory", {
      method: "GET",
      token,
    }),

  updateStock: (
    id: string,
    stock: number,
    token: string,
    extra: Record<string, unknown> = {}
  ) =>
    apiFetch(`/api/admin/inventory/${id}`, {
      method: "PUT",
      token,
      body: JSON.stringify({
        stock,
        ...extra,
      }),
    }),

  increaseStock: (
    id: string,
    quantity: number,
    token: string
  ) =>
    apiFetch(`/api/admin/inventory/${id}/add`, {
      method: "PATCH",
      token,
      body: JSON.stringify({
        quantity,
      }),
    }),

  decreaseStock: (
    id: string,
    quantity: number,
    token: string
  ) =>
    apiFetch(`/api/admin/inventory/${id}/remove`, {
      method: "PATCH",
      token,
      body: JSON.stringify({
        quantity,
      }),
    }),

  // ==========================================
  // PAYMENTS
  // ==========================================

  movements: (id: string, token: string) =>
    apiFetch(`/api/admin/inventory/${id}/movements`, {
      method: "GET",
      token,
    }),

  payments: (token: string, query = "") =>
    apiFetch(`/api/admin/payments${query}`, {
      method: "GET",
      token,
    }),

  // ==========================================
  // ANALYTICS
  // ==========================================

  analytics: (token: string) =>
    apiFetch("/api/admin/analytics", {
      method: "GET",
      token,
    }),

  salesChart: (
    period: "week" | "month" | "year",
    token: string
  ) =>
    apiFetch(
      `/api/admin/analytics/sales?period=${period}`,
      {
        method: "GET",
        token,
      }
    ),

  // ==========================================
  // SETTINGS
  // ==========================================

  settings: (token: string) =>
    apiFetch("/api/admin/settings", {
      method: "GET",
      token,
    }),

  updateSettings: (
    settings: Record<string, any>,
    token: string
  ) =>
    apiFetch("/api/admin/settings", {
      method: "PUT",
      token,
      body: JSON.stringify(settings),
    }),
};