export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Classic Cotton Tee',
    price: 24.99,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    description: 'A timeless classic, this 100% cotton tee is a must-have for every wardrobe. Soft, comfortable, and versatile.'
  },
  {
    id: 2,
    name: 'Slim-Fit Denim Jeans',
    price: 89.99,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Crafted from premium denim with a hint of stretch, these jeans offer a modern slim fit and all-day comfort.'
  },
  {
    id: 3,
    name: 'Wool Blend Overcoat',
    price: 199.99,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    description: 'Stay warm and stylish with our elegant wool blend overcoat, featuring a classic notched lapel and a single-breasted front.'
  },
  {
    id: 4,
    name: 'White Sneakers',
    price: 79.99,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=464&auto=format&fit=crop',
    description: 'Minimalist white sneakers that go with everything. Made with a comfortable cushioned sole.'
  },

  {
    id: 5,
    name: 'Linen-Blend Shirt',
    price: 45.00,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
    description: 'A breezy and lightweight shirt made from a premium linen blend, perfect for warm weather.'
  },
  {
    id: 6,
    name: 'Classic Chino Shorts',
    price: 55.50,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    description: 'Versatile and comfortable, these chino shorts are a summer staple for any casual occasion.'
  },
  {
    id: 7,
    name: 'Leather Belt',
    price: 39.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    description: 'A classic leather belt made from genuine Italian leather. The perfect finishing touch to any outfit.'
  },
  {
    id: 8,
    name: 'Canvas Tote Bag',
    price: 29.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80',
    description: 'A durable and spacious canvas tote bag, perfect for daily use. Features an internal pocket for your essentials.'
  },
  {
    id: 9,
    name: 'Wayfarer Sunglasses',
    price: 120.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=580&auto=format&fit=crop',
    description: 'Iconic Wayfarer sunglasses that offer timeless style and 100% UV protection.'
  },
  {
    id: 10,
    name: 'Denim Jacket',
    price: 99.99,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?q=80&w=464&auto=format&fit=crop',
    description: 'A classic denim jacket that will never go out of style. Made from sturdy, high-quality denim.'
  },


  {
    id: 11,
    name: 'Suede Derby Shoes',
    price: 139.99,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1549481924-d2e389e6c4b2?q=80&w=464&auto=format&fit=crop',
    description: 'Elegant derby shoes in soft suede. Perfect for smart-casual occasions.'
  },
  
  {
    id: 12,
    name: 'Leather Ankle Boots',
    price: 149.99,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1517260911205-8a1b5a6ab8c7?auto=format&fit=crop&w=400&q=80',
    description: 'Handcrafted from genuine leather, these ankle boots are the perfect blend of ruggedness and sophistication.'
  },

  {
    id: 13,
    name: 'Bomber Jacket',
    price: 119.99,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91620649931?q=80&w=464&auto=format&fit=crop',
    description: 'A stylish and versatile bomber jacket. Perfect for transitional weather.'
  },
  {
    id: 14,
    name: 'Leather Loafers',
    price: 129.99,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1599948127922-267f8a735c02?q=80&w=464&auto=format&fit=crop',
    description: 'Classic penny loafers handcrafted from full-grain leather. A timeless addition to your shoe collection.'
  },
  {
    id: 15,
    name: 'Raincoat',
    price: 149.99,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1518779836979-43a059521a83?q=80&w=464&auto=format&fit=crop',
    description: 'A waterproof and windproof raincoat to keep you dry in style. Features a hood and large pockets.'
  },
  {
    id: 16,
    name: 'Corduroy Trousers',
    price: 79.99,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1594938384950-38603903a4b9?q=80&w=464&auto=format&fit=crop',
    description: 'Comfortable and stylish corduroy trousers. Perfect for a relaxed, vintage-inspired look.'
  },
  {
    id: 17,
    name: 'Linen Trousers',
    price: 69.99,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1619688464309-a039774a5647?q=80&w=464&auto=format&fit=crop',
    description: 'Lightweight and breathable linen trousers, ideal for warm weather.'
  },
  {
    id: 18,
    name: 'Tailored Shorts',
    price: 65.00,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1622320479294-89d7c67852c0?q=80&w=464&auto=format&fit=crop',
    description: 'Smart tailored shorts for a polished summer look. Can be dressed up or down.'
  },
  {
    id: 19,
    name: 'Polo Shirt',
    price: 39.99,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1576995853123-5a1d3b4d4b94?q=80&w=464&auto=format&fit=crop',
    description: 'A classic polo shirt made from soft, breathable cotton. A wardrobe essential.'
  },
  {
    id: 20,
    name: 'Oxford Shirt',
    price: 59.99,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1596755094514-9b1e1b000b96?q=80&w=464&auto=format&fit=crop',
    description: 'A timeless Oxford shirt that can be dressed up or down. Made from 100% cotton.'
  },
  {
    id: 21,
    name: 'Knit Sweater',
    price: 89.99,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1616224379435-314b9868e8a3?q=80&w=464&auto=format&fit=crop',
    description: 'A cozy knit sweater perfect for layering. Made from a soft wool blend.'
  },
  {
    id: 22,
    name: 'Leather Backpack',
    price: 249.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb6e0e934?q=80&w=464&auto=format&fit=crop',
    description: 'A stylish and durable leather backpack with multiple compartments for all your essentials.'
  },
  {
    id: 23,
    name: 'Merino Wool Scarf',
    price: 49.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1519758219522-60c6803885c1?q=80&w=464&auto=format&fit=crop',
    description: 'Stay warm with this incredibly soft and luxurious merino wool scarf. Available in various colors.'
  },
  {
    id: 24,
    name: 'Chelsea Boots',
    price: 160.00,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1608256247964-629816b3563a?q=80&w=464&auto=format&fit=crop',
    description: 'Sleek and versatile Chelsea boots in genuine suede. A must-have for any modern wardrobe.'
  },
  {
    id: 25,
    name: 'Trench Coat',
    price: 220.00,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1541427468628-a72387a70267?q=80&w=464&auto=format&fit=crop',
    description: 'A classic double-breasted trench coat. The ultimate timeless outerwear piece.'
  },
  {
    id: 26,
    name: 'Cargo Pants',
    price: 75.00,
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1563178406-412f22c1a056?q=80&w=464&auto=format&fit=crop',
    description: 'Utilitarian-inspired cargo pants with a modern, slim fit. Made from durable cotton twill.'
  },
  {
    id: 27,
    name: 'Henley Shirt',
    price: 42.00,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1622445275899-4a4b70756910?q=80&w=464&auto=format&fit=crop',
    description: 'A comfortable long-sleeve Henley shirt, perfect for casual layering.'
  },
  {
    id: 28,
    name: 'Beanie Hat',
    price: 25.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1576871335624-7890a38f3224?q=80&w=464&auto=format&fit=crop',
    description: 'A classic fisherman-style beanie made from a soft, ribbed knit to keep you warm.'
  },
  {
    id: 29,
    name: 'Chukka Boots',
    price: 155.00,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1543163521-b3449516361d?q=80&w=464&auto=format&fit=crop',
    description: 'Versatile chukka boots in a rich brown leather. Can be dressed up or down with ease.'
  },
  {
    id: 30,
    name: 'Hoodie',
    price: 69.99,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1556821840-3a6d483863a4?q=80&w=464&auto=format&fit=crop',
    description: 'A premium quality hoodie made from soft, heavyweight fleece for ultimate comfort.'
  }
]; 