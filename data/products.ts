import { Product } from '@/store/cart-store';

export const products: Product[] = [
  // Household Items
  {
    id: 'h1',
    name: 'Premium Dish Soap',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400',
    category: 'household',
    description: 'Powerful grease-fighting formula for sparkling dishes.',
    rating: 4.5,
  },
  {
    id: 'h2',
    name: 'All-Purpose Cleaner',
    price: 6.49,
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400',
    category: 'household',
    description: 'Versatile cleaner for all surfaces in your home.',
    rating: 4.7,
  },
  {
    id: 'h3',
    name: 'Microfiber Cloth Set',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400',
    category: 'household',
    description: 'Pack of 6 ultra-soft microfiber cleaning cloths.',
    rating: 4.8,
  },
  {
    id: 'h4',
    name: 'Laundry Detergent',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400',
    category: 'household',
    description: 'Fresh scent liquid laundry detergent, 64 loads.',
    rating: 4.6,
  },
  {
    id: 'h5',
    name: 'Toilet Bowl Cleaner',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
    category: 'household',
    description: 'Heavy-duty toilet bowl cleaner with bleach.',
    rating: 4.4,
  },
  {
    id: 'h6',
    name: 'Glass Cleaner Spray',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400',
    category: 'household',
    description: 'Streak-free shine for windows and mirrors.',
    rating: 4.5,
  },

  // Grocery Items
  {
    id: 'g1',
    name: 'Organic Bananas',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    category: 'grocery',
    description: 'Fresh organic bananas, approximately 2 lbs.',
    rating: 4.8,
  },
  {
    id: 'g2',
    name: 'Whole Grain Bread',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    category: 'grocery',
    description: 'Freshly baked whole grain bread loaf.',
    rating: 4.6,
  },
  {
    id: 'g3',
    name: 'Organic Milk',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    category: 'grocery',
    description: 'Farm-fresh organic whole milk, 1 gallon.',
    rating: 4.7,
  },
  {
    id: 'g4',
    name: 'Free-Range Eggs',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    category: 'grocery',
    description: 'Dozen free-range organic eggs.',
    rating: 4.9,
  },
  {
    id: 'g5',
    name: 'Fresh Avocados',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400',
    category: 'grocery',
    description: 'Pack of 4 ripe Hass avocados.',
    rating: 4.5,
  },
  {
    id: 'g6',
    name: 'Greek Yogurt',
    price: 7.49,
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    category: 'grocery',
    description: 'Plain Greek yogurt, 32 oz container.',
    rating: 4.6,
  },

  // Fast Food Items
  {
    id: 'f1',
    name: 'Classic Cheeseburger',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'fastfood',
    description: 'Juicy beef patty with cheese, lettuce, and tomato.',
    rating: 4.7,
  },
  {
    id: 'f2',
    name: 'Pepperoni Pizza',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400',
    category: 'fastfood',
    description: 'Large pepperoni pizza with extra cheese.',
    rating: 4.8,
  },
  {
    id: 'f3',
    name: 'Chicken Wings',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400',
    category: 'fastfood',
    description: '12-piece buffalo chicken wings with dipping sauce.',
    rating: 4.6,
  },
  {
    id: 'f4',
    name: 'Fish Tacos',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
    category: 'fastfood',
    description: '3 crispy fish tacos with slaw and lime crema.',
    rating: 4.5,
  },
  {
    id: 'f5',
    name: 'Loaded Fries',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20aeb80a1c?w=400',
    category: 'fastfood',
    description: 'Crispy fries topped with cheese, bacon, and sour cream.',
    rating: 4.7,
  },
  {
    id: 'f6',
    name: 'Fried Chicken Sandwich',
    price: 9.49,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400',
    category: 'fastfood',
    description: 'Crispy fried chicken sandwich with pickles and special sauce.',
    rating: 4.8,
  },
];

export const categories = [
  {
    id: 'household',
    name: 'Household',
    icon: 'home',
    color: '#3B82F6',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400',
  },
  {
    id: 'grocery',
    name: 'Grocery',
    icon: 'shopping-bag',
    color: '#10B981',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
  },
  {
    id: 'fastfood',
    name: 'Fast Food',
    icon: 'coffee',
    color: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
  },
];

export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category === category);
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter((product) => product.rating >= 4.7).slice(0, 6);
};
