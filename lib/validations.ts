import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const checkoutSchema = z.object({
  address: z.string().min(5, 'Address is too short'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code'),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, 'Invalid phone number'),
  specialInstructions: z.string().optional(),
});

export const promoCodeSchema = z.object({
  code: z.string().min(1, 'Promo code is required').max(20, 'Invalid promo code'),
});

export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Query too long'),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type PromoCodeInput = z.infer<typeof promoCodeSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
