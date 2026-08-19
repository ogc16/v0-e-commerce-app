import { Prisma } from '@prisma/client';

export type Product = Prisma.ProductGetPayload<{}>;
export type Order = Prisma.OrderGetPayload<{}>;
export type User = Prisma.UserGetPayload<{ select: { id: true; email: true; name: true; phone: true } }>;
