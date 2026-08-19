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
* **Search & Filter** — Real-time text search with category chip filters
* **Product Details** — Full product pages with ratings, descriptions, and delivery info
* **Persistent Shopping Cart** — Cart persists across sessions using AsyncStorage
* **Checkout Flow** — Payment method selection, delivery time options, order placement
* **Authentication** — JWT auth with secure password hashing (bcryptjs)
* **CI/CD Pipeline** — Automated testing and deployment with GitHub Actions

## Tech Stack

### Frontend (Expo App)
* **Framework:** Expo SDK 54 + React Native 0.81
* **Navigation:** Expo Router (file-based routing)
* **State:** Zustand with AsyncStorage persistence
* **HTTP:** Fetch API

### Backend (Server)
* **Runtime:** Node.js + Express
* **ORM:** Prisma 7 with `@prisma/adapter-pg`
* **Database:** CockroachDB (PostgreSQL-compatible)
* **Auth:** JWT via `jose` + `bcryptjs`

## Getting Started

### Prerequisites
* Node.js 20.19.x or higher
* CockroachDB cluster (free tier at cockroachlabs.com)

### 1. Backend Setup

```bash
cd server
npm install
cp ../.env.example ../.env  # Edit with your CockroachDB URL
npx prisma generate
npx prisma db push
npx tsx seed.ts              # Optional: seed sample products
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
```

## Project Structure

```
app/                    # Expo Router screens
  (tabs)/               # Tab navigation
    index.tsx           # Home screen
    search.tsx          # Search with filters
    cart.tsx            # Cart management
    profile.tsx         # User profile
  product/[id].tsx      # Product detail
  category/[id].tsx     # Category listing
  checkout.tsx          # Checkout flow
components/
  ProductCard.tsx       # Reusable product card
lib/
  api.ts               # HTTP client for backend API
  auth.tsx             # React AuthProvider context
  auth-utils.ts        # Token storage + auth HTTP calls
store/
  cart-store.ts        # Zustand cart with persistence
server/                 # Express backend
  index.ts             # API routes + server setup
  seed.ts              # Database seed script
  prisma/
    schema.prisma      # Database schema
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/signin` | Sign in |
| GET | `/api/auth/me` | Get current user (auth) |
| GET | `/api/products` | List products |
| GET | `/api/products/search?q=` | Search products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/orders` | Create order (auth) |
| GET | `/api/orders` | Get user orders (auth) |

## CI/CD

GitHub Actions runs on every push/PR:
1. **Type Checking** — TypeScript compilation
2. **Expo Doctor** — Dependency compatibility

## License

MIT
