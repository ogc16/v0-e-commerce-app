import { prisma } from './prisma';
import type { Product, Order } from './types';

export const categories = [
  { id: 'household', name: 'Household', icon: 'home', color: '#3B82F6' },
  { id: 'grocery', name: 'Grocery', icon: 'shopping-bag', color: '#10B981' },
  { id: 'fastfood', name: 'Fast Food', icon: 'coffee', color: '#F59E0B' },
];

export async function getProducts(category?: string): Promise<Product[]> {
  try {
    return await prisma.product.findMany({
      where: category ? { category } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    return await prisma.product.findUnique({ where: { id } });
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    return await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      orderBy: { rating: 'desc' },
    });
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

export async function createOrder(order: {
  userId: string;
  items: any[];
  total: number;
  shippingAddress?: string;
  paymentMethod?: string;
}): Promise<Order | null> {
  try {
    return await prisma.order.create({
      data: {
        userId: order.userId,
        items: order.items,
        total: order.total,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
      },
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  try {
    return await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}
