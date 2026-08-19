# ShopEase

A production-ready grocery and food delivery e-commerce app with a React Native (Expo) frontend and Node.js backend.

## Architecture

```
┌─────────────────┐     HTTP/REST     ┌──────────────────┐     Prisma     ┌─────────────┐
│  Expo React     │ ◄──────────────► │  Express Server  │ ◄────────────► │ CockroachDB │
│  Native App     │                   │  (API)           │                │             │
└─────────────────┘                   └──────────────────┘                └─────────────┘
```

## Features

* **Product Browsing** — Browse products across Household, Grocery, and Fast Food categories
* **Search & Filter** — Server-side search with category filters, price range, sorting, and pagination
* **Product Details** — Full product pages with ratings, descriptions, and delivery info
* **Persistent Shopping Cart** — Cart persists across sessions using AsyncStorage; syncs to backend when logged in
* **Secure Authentication** — JWT auth with bcrypt password hashing, sign-in/sign-up screens
* **Route Guards** — Protected checkout and profile routes; unauthenticated users redirected to login
* **Secure Checkout** — Stripe-ready payment flow with server-side price verification and stock deduction
* **CI/CD Pipeline** — Automated type checking, Expo compatibility, and build verification on PRs

## Tech Stack

### Frontend (Expo App)
* **Framework:** Expo SDK 54 + React Native 0.81
* **Navigation:** Expo Router (file-based routing)
* **State:** Zustand with AsyncStorage persistence
* **Auth:** React Context + JWT token storage
* **HTTP:** Fetch API with auto-injected auth headers

### Backend (Server)
* **Runtime:** Node.js + Express
* **ORM:** Prisma 7 with `@prisma/adapter-pg`
* **Database:** CockroachDB (PostgreSQL-compatible)
* **Auth:** JWT via `jose` + `bcryptjs`
* **Payments:** Stripe Checkout (ready for integration)

## Getting Started

### Prerequisites
* Node.js 20.19.x or higher
* CockroachDB cluster (free tier at cockroachlabs.com)

### 1. Backend Setup

```bash
cd server
npm install
cp ../.env.example ../.env  # Edit with your CockroachDB URL + JWT secret
npx prisma generate
npx prisma db push
npx tsx seed.ts              # Seeds 30 sample products
npm run dev                  # Starts on http://localhost:3001
```

### 2. Frontend Setup

```bash
# From project root
npm install --legacy-peer-deps
npx expo start
```

### Environment Variables

**`.env` (root)** — Used by both frontend and backend:
```env
EXPO_PUBLIC_API_URL=http://localhost:3001
PORT=3001
DATABASE_URL="postgresql://user:pass@host:26257/defaultdb?sslmode=verify-full"
JWT_SECRET="your-super-secret-jwt-key-change-this"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## Project Structure

```
app/                    # Expo Router screens
  (auth)/               # Authentication screens
    sign-in.tsx         # Sign in
    sign-up.tsx         # Create account
    _layout.tsx         # Auth layout (redirects if logged in)
  (tabs)/               # Tab navigation
    index.tsx           # Home screen
    search.tsx          # Search with server-side filters + pagination
    cart.tsx            # Cart management
    profile.tsx         # User profile (shows login prompt or profile)
    _layout.tsx         # Tab bar with cart badge
  (protected)/          # Auth-required screens
    checkout.tsx        # Protected checkout
  product/[id].tsx      # Product detail
  category/[id].tsx     # Category listing
  checkout.tsx          # Checkout with Stripe
components/
  ProductCard.tsx       # Reusable product card
lib/
  api.ts               # HTTP client with auth headers + pagination
  auth.tsx             # React AuthProvider context
  auth-utils.ts        # Token storage + auth HTTP calls
store/
  cart-store.ts        # Zustand cart with persistence + getCartItems()
server/                 # Express backend
  index.ts             # API routes (auth, products, checkout, orders)
  seed.ts              # 30-product seed script
  prisma.config.ts     # Prisma CLI config
  prisma/
    schema.prisma      # Database schema
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Create account |
| POST | `/api/auth/signin` | No | Sign in |
| GET | `/api/auth/me` | Yes | Get current user |
| GET | `/api/products` | No | List products (search, filter, sort, paginate) |
| GET | `/api/products/search?q=` | No | Search products |
| GET | `/api/products/:id` | No | Get product by ID |
| POST | `/api/checkout/create-session` | Yes | Create checkout (verifies prices server-side) |
| POST | `/api/orders` | Yes | Create order |
| GET | `/api/orders` | Yes | Get user orders |
| GET | `/api/orders/:id` | Yes | Get order by ID |
| GET | `/api/health` | No | Health check |

### Query Parameters for `/api/products`

| Param | Type | Description |
|-------|------|-------------|
| `search` | string | Text search across name + description |
| `category` | string | Filter by category (household, grocery, fastfood) |
| `badge` | string | Filter by badge (Popular, Best Seller, etc.) |
| `sort` | string | Sort: `price-asc`, `price-desc`, `rating`, `newest`, `name` |
| `minPrice` | number | Minimum price filter |
| `maxPrice` | number | Maximum price filter |
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (max: 50, default: 20) |

## CI/CD

GitHub Actions runs on every push/PR to `main`:
1. **Type Checking** — TypeScript compilation (`tsc --noEmit`)
2. **Expo Doctor** — Dependency compatibility check
3. **Build Check** — Web export verification

## License

MIT
