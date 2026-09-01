import { apiFetch } from "./api";

export const shopApi = {
  checkout: (payload: unknown, token: string) =>
    apiFetch("/api/checkout", {
      method: "POST",
      token,
      body: JSON.stringify(payload),
    }),

  orders: (token: string) =>
    apiFetch("/api/orders", { method: "GET", token }),

  order: (id: string, token: string) =>
    apiFetch(`/api/orders/${id}`, { method: "GET", token }),

  cancelOrder: (id: string, token: string) =>
    apiFetch(`/api/orders/${id}/cancel`, { method: "POST", token }),

  payment: (id: string, token: string) =>
    apiFetch(`/api/payments/${id}`, { method: "GET", token }),

  confirmPayment: (id: string, confirmToken: string, token: string) =>
    apiFetch(`/api/payments/${id}/confirm`, {
      method: "POST",
      token,
      body: JSON.stringify({ confirmToken }),
    }),

  failPayment: (id: string, token: string) =>
    apiFetch(`/api/payments/${id}/fail`, {
      method: "POST",
      token,
    }),

  notifications: (token: string) =>
    apiFetch("/api/notifications", { method: "GET", token }),

  markNotificationRead: (id: string, token: string) =>
    apiFetch(`/api/notifications/${id}/read`, {
      method: "PATCH",
      token,
    }),
};
