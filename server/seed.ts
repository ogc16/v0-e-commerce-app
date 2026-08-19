import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL,
});

const products = [
  // Household
  {
    name: 'All-Purpose Cleaner',
    description: 'Multi-surface cleaning spray for kitchen and bathroom. Kills 99.9% of germs.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400',
    category: 'household',
    rating: 4.5,
    stock: 50,
  },
  {
    name: 'Paper Towels (6-pack)',
    description: 'Absorbent, 2-ply paper towels. Perfect for everyday messes.',
    price: 8.49,
    image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400',
    category: 'household',
    rating: 4.3,
    stock: 80,
  },
  {
    name: 'Laundry Detergent',
    description: 'Concentrated liquid detergent for all machine types. Fresh scent.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400',
    category: 'household',
    rating: 4.7,
    stock: 35,
  },
  {
    name: 'Dish Soap',
    description: 'Grease-cutting dish soap with lemon fragrance. 500ml bottle.',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    category: 'household',
    rating: 4.4,
    stock: 60,
  },
  {
    name: 'Trash Bags (30ct)',
    description: 'Strong, leak-proof garbage bags. Fits standard kitchen bins.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400',
    category: 'household',
    rating: 4.2,
    stock: 45,
  },
  {
    name: 'Sponges (8-pack)',
    description: 'Non-scratch sponges for dishes and surfaces. Dishwasher safe.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=400',
    category: 'household',
    rating: 4.1,
    stock: 70,
  },
  // Grocery
  {
    name: 'Fresh Bananas (1kg)',
    description: 'Ripe organic bananas. Great source of potassium.',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
    category: 'grocery',
    rating: 4.6,
    stock: 100,
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Freshly baked whole grain bread. No preservatives.',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
    category: 'grocery',
    rating: 4.5,
    stock: 40,
  },
  {
    name: 'Free-Range Eggs (12)',
    description: 'Farm-fresh large eggs from free-range hens.',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400',
    category: 'grocery',
    rating: 4.8,
    stock: 55,
  },
  {
    name: 'Organic Milk (1L)',
    description: 'Pasteurized whole organic milk. Rich and creamy.',
    price: 3.79,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400',
    category: 'grocery',
    rating: 4.4,
    stock: 65,
  },
  {
    name: 'Cheddar Cheese (200g)',
    description: 'Mature cheddar cheese. Perfect for sandwiches and cooking.',
    price: 5.49,
    image: 'https://images.unsplash.com/photo-1618176907449-4b6e71b40a2f?w=400',
    category: 'grocery',
    rating: 4.6,
    stock: 30,
  },
  {
    name: 'Fresh Apples (1kg)',
    description: 'Crisp red apples. Sweet and juicy.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400',
    category: 'grocery',
    rating: 4.5,
    stock: 90,
  },
  // Fast Food
  {
    name: 'Classic Burger',
    description: 'Juicy beef patty with lettuce, tomato, and special sauce.',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: 'fastfood',
    rating: 4.7,
    stock: 999,
  },
  {
    name: 'Margherita Pizza',
    description: 'Wood-fired pizza with mozzarella, tomato sauce, and basil.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400',
    category: 'fastfood',
    rating: 4.8,
    stock: 999,
  },
  {
    name: 'Chicken Tenders (6pc)',
    description: 'Crispy breaded chicken tenders with dipping sauce.',
    price: 7.49,
    image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb44?w=400',
    category: 'fastfood',
    rating: 4.5,
    stock: 999,
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with croutons, parmesan, and Caesar dressing.',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    category: 'fastfood',
    rating: 4.3,
    stock: 999,
  },
  {
    name: 'French Fries (Large)',
    description: 'Crispy golden fries seasoned with sea salt.',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400',
    category: 'fastfood',
    rating: 4.6,
    stock: 999,
  },
  {
    name: 'Chocolate Milkshake',
    description: 'Rich and creamy chocolate milkshake topped with whipped cream.',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400',
    category: 'fastfood',
    rating: 4.7,
    stock: 999,
  },
];

async function main() {
  console.log('Seeding database...');

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name.toLowerCase().replace(/\s+/g, '-') },
      update: product,
      create: {
        id: product.name.toLowerCase().replace(/\s+/g, '-'),
        ...product,
      },
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
