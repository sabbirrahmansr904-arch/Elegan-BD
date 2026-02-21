import React from 'react';
import { motion } from 'motion/react';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { products, Product } from '../data/products';

interface HomeProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ products, onAddToCart }) => {
  const pants = products.filter(p => p.category === 'Formal Pants');
  const shirts = products.filter(p => p.category === 'Formal Shirts');

  const ProductSection = ({ title, subtitle, items, id }: { title: string, subtitle: string, items: Product[], id: string }) => (
    <section id={id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-b border-zinc-100 last:border-0">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">{title}</h2>
        <p className="text-zinc-500 mt-2">{subtitle}</p>
      </div>

      <div className="relative group">
        <motion.div 
          layout
          className="flex space-x-6 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory"
        >
          {items.filter(p => p && p.id).map((product) => (
            <div key={product.id} className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] snap-center">
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart} 
              />
            </div>
          ))}
        </motion.div>
        
        {/* Scroll Indicator */}
        <div className="flex justify-start space-x-2 mt-4">
          <div className="w-10 h-1 bg-zinc-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-black"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Hero />

      <div className="bg-white">
        {/* All Products Section */}
        <ProductSection 
          id="products-section"
          title="All Collections" 
          subtitle="Explore our entire range of premium formal wear"
          items={products}
        />

        {/* Pants Section */}
        <ProductSection 
          id="pants-section"
          title="Premium Formal Pants" 
          subtitle="Perfectly tailored for comfort and style"
          items={pants}
        />

        {/* Shirts Section */}
        <ProductSection 
          id="shirts-section"
          title="Executive Formal Shirts" 
          subtitle="Sharp looks for the modern professional"
          items={shirts}
        />
      </div>
    </>
  );
};
