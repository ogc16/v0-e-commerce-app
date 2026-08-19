# ShopEase

A production-ready grocery and food delivery e-commerce app built with Expo SDK 54, React Native 0.81, and Supabase.

## Features

* **Product Browsing** — Browse products across Household, Grocery, and Fast Food categories
* **Search & Filter** — Real-time text search with category chip filters
* **Product Details** — Full product pages with ratings, descriptions, and delivery info
* **Persistent Shopping Cart** — Cart persists across sessions using AsyncStorage
* **Checkout Flow** — Payment method selection, delivery time options, order placement
* **Authentication** — Secure user authentication with Supabase Auth
* **Input Validation** — Zod schemas for form validation and type safety
* **CI/CD Pipeline** — Automated testing and deployment with GitHub Actions

## Tech Stack

* **Framework:** Expo SDK 54 + React Native 0.81
* **Navigation:** Expo Router (file-based routing)
* **State:** Zustand with AsyncStorage persistence
* **Backend:** Supabase (PostgreSQL + Auth)
* **Validation:** Zod
* **Language:** TypeScript

## Getting Started

### Prerequisites

* Node.js 20.19.x or higher
* npm or yarn
* Expo Go app (iOS/Android)

### Installation

```bash
# Clone the repository
git clone https://github.com/ogc16/v0-e-commerce-app.git
cd v0-e-commerce-app

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env

# Start the app
npx expo start
```

### Environment Variables

Create a `.env` file with your Supabase credentials:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your-key-here
```

## Project Structure

```
app/
  (tabs)/
    index.tsx          # Home screen
    search.tsx         # Search with filters
    cart.tsx           # Cart management
    profile.tsx        # User profile
  product/[id].tsx     # Product detail
  category/[id].tsx    # Category listing
  checkout.tsx         # Checkout flow
components/
  ProductCard.tsx      # Reusable product card
lib/
  supabase.ts         # Supabase client config
  api.ts              # Database API functions
  auth.tsx            # Authentication context
  validations.ts      # Zod validation schemas
  env.ts              # Environment config validation
  types.ts            # TypeScript types
data/
  products.ts         # Product catalog (fallback)
store/
  cart-store.ts       # Zustand cart with persistence
```

## Architecture

### State Management

* **Zustand** with `persist` middleware for cart data
* **AsyncStorage** for cross-session persistence
* **Supabase** for server-side data sync

### Security

* **Zod** validation for all user inputs
* **Supabase Auth** for authentication
* **Environment validation** with fail-fast errors
* **Secure storage** with expo-secure-store

### Performance

* **expo-image** for optimized image loading
* **Memoized components** for efficient re-renders
* **Lazy loading** for product images

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image TEXT,
  category TEXT CHECK (category IN ('household', 'grocery', 'fastfood')),
  rating DECIMAL(3,2) DEFAULT 0,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT CHECK (status IN ('pending', 'processing', 'shipped', 'delivered')),
  shipping_address TEXT,
  payment_method TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## CI/CD

GitHub Actions workflow runs on every push/PR:

1. **Type Checking** — TypeScript compilation
2. **Linting** — ESLint code quality
3. **Expo Doctor** — Dependency compatibility
4. **Tests** — Unit and integration tests

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
