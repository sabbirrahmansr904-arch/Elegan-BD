export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  sizes: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: "Men's Formal Shirt – Navy Blue",
    price: 1250,
    description: 'Premium quality cotton formal shirt with a slim fit design, perfect for office and formal events.',
    category: 'Formal Shirts',
    image: 'https://picsum.photos/seed/shirt-navy/600/800',
    rating: 4.9,
    reviews: 45,
    sizes: ['M', 'L', 'XL']
  },
  {
    id: '2',
    name: "Men's Formal Pant – Dark Ash",
    price: 1450,
    description: 'High-quality gabardine formal pant with a comfortable stretch and modern cut.',
    category: 'Formal Pants',
    image: 'https://picsum.photos/seed/pant-ash/600/800',
    rating: 4.8,
    reviews: 32,
    sizes: ['30', '32', '34', '36', '38']
  },
  {
    id: '4',
    name: "Men's Formal Shirt – Pure White",
    price: 1250,
    description: 'Essential white formal shirt, crisp and elegant for every gentleman.',
    category: 'Formal Shirts',
    image: 'https://picsum.photos/seed/shirt-white/600/800',
    rating: 5.0,
    reviews: 60,
    sizes: ['M', 'L', 'XL']
  },
  {
    id: '5',
    name: "Men's Formal Pant – Black",
    price: 1450,
    description: 'Classic black formal pant, a must-have for every formal wardrobe.',
    category: 'Formal Pants',
    image: 'https://picsum.photos/seed/pant-black/600/800',
    rating: 4.9,
    reviews: 55,
    sizes: ['30', '32', '34', '36', '38']
  },
  {
    id: '6',
    name: "Men's Formal Shirt – Sky Blue",
    price: 1250,
    description: 'Refreshing sky blue formal shirt with a soft finish and durable stitching.',
    category: 'Formal Shirts',
    image: 'https://picsum.photos/seed/shirt-sky/600/800',
    rating: 4.8,
    reviews: 22,
    sizes: ['M', 'L', 'XL']
  },
  {
    id: '7',
    name: "Men's Formal Pant – Beige",
    price: 1450,
    description: 'Versatile beige formal pant that pairs perfectly with dark and light shirts.',
    category: 'Formal Pants',
    image: 'https://picsum.photos/seed/pant-beige/600/800',
    rating: 4.7,
    reviews: 18,
    sizes: ['30', '32', '34', '36', '38']
  }
];
