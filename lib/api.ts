import { supabase } from './supabase';
import { Database } from './types';

type Product = Database['public']['Tables']['products']['Row'];
type Order = Database['public']['Tables']['orders']['Row'];

const categories = [
  { id: 'household', name: 'Household', icon: 'home', color: '#3B82F6' },
  { id: 'grocery', name: 'Grocery', icon: 'shopping-bag', color: '#10B981' },
  { id: 'fastfood', name: 'Fast Food', icon: 'coffee', color: '#F59E0B' },
];

export { categories };

export async function getProducts(category?: string): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('rating', { ascending: false });

  if (error) {
    console.error('Error searching products:', error);
    return [];
  }

  return data || [];
}

export async function createOrder(order: Database['public']['Tables']['orders']['Insert']): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (error) {
    console.error('Error creating order:', error);
    return null;
  }

  return data;
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return data || [];
}
