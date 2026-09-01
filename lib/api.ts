const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  "http://localhost:4000";

type ApiFetchOptions = RequestInit & {
  token?: string;
};

export async function apiFetch(
  endpoint: string,
  options: ApiFetchOptions = {}
) {
  const {
    token,
    ...fetchOptions
  } = options;

  const headers = new Headers(
    fetchOptions.headers
  );

  if (
    !(fetchOptions.body instanceof FormData)
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const sameOrigin =
    endpoint.startsWith("/api/admin") ||
    endpoint.startsWith("/api/checkout") ||
    endpoint.startsWith("/api/orders") ||
    endpoint.startsWith("/api/payments") ||
    endpoint.startsWith("/api/notifications");

  const base = sameOrigin ? "" : API_BASE;

  const response = await fetch(
    `${base}${endpoint}`,
    {
      ...fetchOptions,
      headers,
      credentials: "include",
      cache: "no-store",
    }
  );

  let data: any = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      `Request failed with status ${response.status}`
    );
  }

  return data;
}