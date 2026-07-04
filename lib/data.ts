const API_BASE = "https://dummyjson.com";

export interface DummyProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

export interface ProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyCategory {
  slug: string;
  name: string;
  url: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  categorySlug: string;
}

export interface ProductsResult {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type FetchOptions = RequestInit & { next?: { revalidate?: number } };

async function fetchWithRetry<T>(url: string, options: FetchOptions, retries = 3): Promise<T> {
  let lastError: Error = new Error("Failed to fetch");

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        if (response.status >= 500 && attempt < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        throw new ApiError(`API request failed: ${response.statusText}`, response.status);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown fetch error");
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  throw lastError;
}

function formatCategory(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function mapDummyProduct(raw: DummyProduct): Product {
  return {
    id: raw.id,
    name: raw.title,
    price: raw.price,
    description: raw.description,
    image: raw.thumbnail,
    category: formatCategory(raw.category),
    categorySlug: raw.category,
  };
}

export async function getProducts(options: {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
  revalidate?: number;
} = {}): Promise<ProductsResult> {
  const { limit = 30, skip = 0, search, category, revalidate = 60 } = options;
  const fetchOptions: FetchOptions = { next: { revalidate } };

  try {
    let url: string;

    if (search) {
      const params = new URLSearchParams({ q: search, limit: String(limit), skip: String(skip) });
      url = `${API_BASE}/products/search?${params}`;
    } else if (category) {
      const params = new URLSearchParams({ limit: String(limit), skip: String(skip) });
      url = `${API_BASE}/products/category/${encodeURIComponent(category)}?${params}`;
    } else {
      const params = new URLSearchParams({ limit: String(limit), skip: String(skip) });
      url = `${API_BASE}/products?${params}`;
    }

    const data = await fetchWithRetry<ProductsResponse>(url, fetchOptions);

    return {
      products: data.products.map(mapDummyProduct),
      total: data.total,
      skip: data.skip,
      limit: data.limit,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error instanceof ApiError ? error : new ApiError("Failed to load products");
  }
}

export async function getProductById(id: number, revalidate = 300): Promise<Product | undefined> {
  try {
    const data = await fetchWithRetry<DummyProduct>(`${API_BASE}/products/${id}`, {
      next: { revalidate },
    });
    return mapDummyProduct(data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return undefined;
    }
    console.error(`Failed to fetch product ${id}:`, error);
    throw error instanceof ApiError ? error : new ApiError("Failed to load product");
  }
}

export async function getCategories(revalidate = 86400): Promise<{ slug: string; name: string }[]> {
  try {
    const data = await fetchWithRetry<(DummyCategory | string)[]>(`${API_BASE}/products/categories`, {
      next: { revalidate },
    });

    return data.map((category) => {
      if (typeof category === "string") {
        return { slug: category, name: formatCategory(category) };
      }
      if (category && typeof category === "object" && "slug" in category) {
        return {
          slug: category.slug,
          name: category.name || formatCategory(category.slug),
        };
      }
      return { slug: String(category), name: formatCategory(String(category)) };
    });
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error instanceof ApiError ? error : new ApiError("Failed to load categories");
  }
}
