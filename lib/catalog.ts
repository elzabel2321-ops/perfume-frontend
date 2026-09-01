import { Product } from "@/types";
import { products as staticProducts } from "@/lib/products";

export function mapDbProduct(doc: any): Product | null {
  if (!doc) {
    return null;
  }

  const id = String(doc._id || doc.id || "");
  if (!id) {
    return null;
  }

  return {
    id,
    name: String(doc.name || "Untitled"),
    price: Number(doc.price || 0),
    category: String(doc.category || "Uncategorized"),
    image: String(doc.image || ""),
    description: String(doc.description || ""),
    rating: Number(doc.rating || 4.5),
    reviews: Number(doc.reviews || 0),
  };
}

export function mergeCatalog(dbProducts: any[] = []): Product[] {
  const live = dbProducts
    .map(mapDbProduct)
    .filter((product): product is Product => Boolean(product));

  const liveNames = new Set(
    live.map((product) => product.name.trim().toLowerCase())
  );
  const remainingStatic = staticProducts.filter(
    (product) => !liveNames.has(product.name.trim().toLowerCase())
  );

  return [...live, ...remainingStatic];
}

export async function fetchDbProducts() {
  const backendUrl =
    process.env.BACKEND_URL ||
    process.env.NEXT_PUBLIC_API_BASE ||
    "http://localhost:4000";

  const response = await fetch(`${backendUrl}/api/products`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load live products.");
  }

  const data = await response.json();
  if (Array.isArray(data)) {
    return data;
  }

  return data?.products || [];
}

export async function fetchCatalog(): Promise<Product[]> {
  try {
    const dbProducts = await fetchDbProducts();
    return mergeCatalog(dbProducts);
  } catch {
    return staticProducts;
  }
}

export async function fetchCatalogProduct(id: string) {
  const catalog = await fetchCatalog();
  return catalog.find((product) => product.id === id);
}
