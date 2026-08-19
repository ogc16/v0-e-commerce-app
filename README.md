# ShopEase

A production-ready grocery and food delivery e-commerce app built with Expo SDK 54, React Native 0.81, CockroachDB, and Prisma.

## Features

* **Product Browsing** — Browse products across Household, Grocery, and Fast Food categories
* **Search & Filter** — Real-time text search with category chip filters
* **Product Details** — Full product pages with ratings, descriptions, and delivery info
* **Persistent Shopping Cart** — Cart persists across sessions using AsyncStorage
* **Checkout Flow** — Payment method selection, delivery time options, order placement
* **Authentication** — Custom JWT auth with secure password hashing
* **Input Validation** — Zod schemas for form validation and type safety
* **CI/CD Pipeline** — Automated testing and deployment with GitHub Actions

## Tech Stack

* **Framework:** Expo SDK 54 + React Native 0.81
* **Navigation:** Expo Router (file-based routing)
* **State:** Zustand with AsyncStorage persistence
* **Database:** CockroachDB (PostgreSQL-compatible distributed SQL)
* **ORM:** Prisma
* **Auth:** Custom JWT with bcryptjs
* **Validation:** Zod
* **Language:** TypeScript

## Getting Started

### Prerequisites

* Node.js 20.19.x or higher
* npm or yarn
* Expo Go app (iOS/Android)
* CockroachDB cluster (free tier available at cockroachlabs.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/ogc16/v0-e-commerce-app.git
cd v0-e-commerce-app

# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Start the app
npx expo start
```

### Environment Variables

Create a `.env` file with your CockroachDB credentials:

```env
DATABASE_URL="postgresql://user:password@host:26257/shopease?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key-change-this"
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
  prisma.ts           # Prisma client
  api.ts              # Database API functions
  auth.tsx            # Authentication context
  auth-utils.ts       # JWT + password utilities
data/
  seed.ts             # Database seed script
store/
  cart-store.ts       # Zustand cart with persistence
prisma/
  schema.prisma       # Database schema
```

## Database Schema

### Users
* id, email (unique), password (hashed), name, phone, timestamps

### Products
* id, name, description, price, image, category, rating, stock, timestamps

### Orders
* id, user_id, items (JSON), total, status, shipping_address, payment_method, timestamps

## CI/CD

GitHub Actions workflow runs on every push/PR:

1. **Type Checking** — TypeScript compilation
2. **Expo Doctor** — Dependency compatibility

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
