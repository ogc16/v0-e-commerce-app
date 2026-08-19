const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  category: string;
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

export const categories = [
  { id: 'household', name: 'Household', icon: 'home', color: '#3B82F6' },
  { id: 'grocery', name: 'Grocery', icon: 'shopping-bag', color: '#10B981' },
  { id: 'fastfood', name: 'Fast Food', icon: 'coffee', color: '#F59E0B' },
];

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `API error ${res.status}`);
  }
  return res.json();
}

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    const query = category ? `?category=${category}` : '';
    const { products } = await apiFetch<{ products: Product[] }>(
      `/api/products${query}`
    );
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
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

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const { products } = await apiFetch<{ products: Product[] }>(
      `/api/products/search?q=${encodeURIComponent(query)}`
    );
    return products;
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
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
