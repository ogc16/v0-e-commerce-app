const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string;
  badge: string | null;
  rating: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: any;
  total: number;
  status: string;
  shippingAddress: string | null;
  paymentMethod: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

export const categories = [
  { id: 'household', name: 'Household', icon: 'home', color: '#3B82F6' },
  { id: 'grocery', name: 'Grocery', icon: 'shopping-bag', color: '#10B981' },
  { id: 'fastfood', name: 'Fast Food', icon: 'coffee', color: '#F59E0B' },
];

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = await (await import('./auth-utils')).getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options?.headers as Record<string, string>,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API error ${res.status}`);
  }
  return res.json();
}

export async function getProducts(
  category?: string,
  options?: { search?: string; sort?: string; page?: number; limit?: number; minPrice?: number; maxPrice?: number; badge?: string }
): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (options?.search) params.set('search', options.search);
    if (options?.sort) params.set('sort', options.sort);
    if (options?.page) params.set('page', String(options.page));
    if (options?.limit) params.set('limit', String(options.limit));
    if (options?.minPrice) params.set('minPrice', String(options.minPrice));
    if (options?.maxPrice) params.set('maxPrice', String(options.maxPrice));
    if (options?.badge) params.set('badge', options.badge);

    const query = params.toString();
    return await apiFetch<ProductsResponse>(`/api/products${query ? `?${query}` : ''}`);
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } };
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const { product } = await apiFetch<{ product: Product }>(
      `/api/products/${id}`
    );
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function searchProducts(
  query: string,
  options?: { category?: string; sort?: string; page?: number; limit?: number }
): Promise<ProductsResponse> {
  try {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (options?.category) params.set('category', options.category);
    if (options?.sort) params.set('sort', options.sort);
    if (options?.page) params.set('page', String(options.page));
    if (options?.limit) params.set('limit', String(options.limit));

    const qs = params.toString();
    return await apiFetch<ProductsResponse>(`/api/products/search${qs ? `?${qs}` : ''}`);
  } catch (error) {
    console.error('Error searching products:', error);
    return { products: [], pagination: { page: 1, limit: 20, total: 0, pages: 0 } };
  }
}

export async function createCheckoutSession(items: { id: string; quantity: number }[], shippingAddress?: string) {
  try {
    const { order, clientSecret } = await apiFetch<{ order: Order; clientSecret: string | null }>(
      '/api/checkout/create-session',
      {
        method: 'POST',
        body: JSON.stringify({ items, shippingAddress }),
      }
    );
    return { order, clientSecret };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

export async function createOrder(order: {
  items: any[];
  total: number;
  shippingAddress?: string;
  paymentMethod?: string;
  token: string;
}): Promise<Order | null> {
  try {
    const { order: created } = await apiFetch<{ order: Order }>(
      '/api/orders',
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${order.token}` },
        body: JSON.stringify({
          items: order.items,
          total: order.total,
          shippingAddress: order.shippingAddress,
          paymentMethod: order.paymentMethod,
        }),
      }
    );
    return created;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

export async function getUserOrders(token: string): Promise<Order[]> {
  try {
    const { orders } = await apiFetch<{ orders: Order[] }>('/api/orders', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}
