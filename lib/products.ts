import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Essence of Roses',
    price: 89.99,
    category: 'Floral',
    image:  '/images/Essence of Roses.jpg',
    description: 'A luxurious blend of premium roses with hints of sandalwood',
    rating: 4.8,
    reviews: 324,
  },

  {
    id: '2',
    name: 'Ocean Breeze',
    price: 79.99,
    category: 'Fresh',
    image: '/images/Ocean Breeze.jpg',
    description: 'Crisp and refreshing citrus with aquatic notes',
    rating: 4.6,
    reviews: 256,
  },
  {
    id: '3',
    name: 'Midnight Elegance',
    price: 99.99,
    category: 'Oriental',
    image: '/images/Midnight Elegance.jpg',
    description: 'Deep, sophisticated blend of amber and musk',
    rating: 4.9,
    reviews: 412,
  },
  {
    id: '4',
    name: 'Vanilla Dream',
    price: 69.99,
    category: 'Sweet',
    image: '/images/Vanilla Dream.jpg',
    description: 'Warm vanilla with hints of caramel and tonka bean',
    rating: 4.7,
    reviews: 189,
  },
  {
    id: '5',
    name: 'prada',
    price: 75.99,
    category: 'Floral',
    image: '/images/prada.jpg',
    description: 'Fresh lavender with subtle herbal notes',
    rating: 4.5,
    reviews: 147,
  },
  {
    id: '6',
    name: 'Gold Standard',
    price: 119.99,
    category: 'Luxury',
    image: '/images/Gold Standard.jpg',
    description: 'Premium luxury fragrance with rare ingredients',
    rating: 4.9,
    reviews: 521,
  },
];

export const categories = [
  {
    id: '1',
    name: 'Floral',
    image: '/images/laura.jpg',
    description: 'Romantic and elegant fragrances',
  },
  {
    id: '2',
    name: 'Fresh',
    image: '/images/fernando.jpg',
    description: 'Light and energizing scents',
  },
  {
    id: '3',
    name: 'Oriental',
    image: '/images/prada.jpg',
    description: 'Sensual and warm fragrances',
  },
  {
    id: '4',
    name: 'Sweet',
    image: '/images/5chanel.jpg',
    description: 'Sweet and playful scents',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
  );
};
