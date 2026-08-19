# ShopEase

A modern grocery and food delivery e-commerce app built with Expo Router and React Native.

## Features

* **Product Browsing** — Browse products across Household, Grocery, and Fast Food categories
* **Search & Filter** — Real-time text search with category chip filters
* **Product Details** — Full product pages with ratings, descriptions, and delivery info
* **Shopping Cart** — Add/remove items, quantity controls, order summary with delivery fee logic
* **Checkout Flow** — Payment method selection, delivery time options, order placement
* **Tab Navigation** — 4-tab layout with live cart badge

## Tech Stack

* **Framework:** Expo SDK 53 + React Native 0.79
* **Navigation:** Expo Router (file-based routing)
* **State:** Zustand
* **Language:** TypeScript

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start the app
npx expo start
```

Scan the QR code with Expo Go (Android/iOS) or press `w` for web.

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
data/
  products.ts         # Product catalog (18 items)
store/
  cart-store.ts       # Zustand cart state
```

## Screens

| Screen | Description |
|--------|-------------|
| Home | Greeting, promo banner, categories, featured products |
| Search | Text search + category filters with product grid |
| Cart | Item management, quantity controls, order summary |
| Profile | User info, stats, settings menu |
| Product Detail | Full product view with add-to-cart |
| Category | Filtered product grid by category |
| Checkout | Delivery, payment, and order placement |

## License

MIT
