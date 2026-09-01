export function getBackendUrl() {
  return (
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_BASE ||
    "http://localhost:4000"
  );
}

export function getInternalSecret() {
  return (
    process.env.INTERNAL_API_SECRET ||
    "aromanova-dev-internal"
  );
}

export async function backendFetch(
  path: string,
  init: RequestInit = {}
) {
  const response = await fetch(`${getBackendUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Secret": getInternalSecret(),
      ...(init.headers || {}),
    },
    cache: "no-store",
  });

  let data: any = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return { response, data };
}
