import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
    >
      <Link to={`/product/${product.id}`} className="aspect-square overflow-hidden relative block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          className="absolute bottom-4 right-4 p-3 bg-white text-zinc-900 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-zinc-900 hover:text-white z-10"
        >
          <ShoppingCart size={20} />
        </button>
      </Link>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{product.category}</span>
          <div className="flex items-center text-amber-400">
            <Star size={14} fill="currentColor" />
            <span className="ml-1 text-xs font-medium text-zinc-600">{product.rating}</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-zinc-900 mb-1 group-hover:underline decoration-zinc-400 underline-offset-4 transition-all line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-sm text-zinc-500 line-clamp-2 mb-4 h-10">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-zinc-900">৳{product.price.toLocaleString()}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="text-sm font-semibold text-zinc-900 hover:underline transition-all"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};
