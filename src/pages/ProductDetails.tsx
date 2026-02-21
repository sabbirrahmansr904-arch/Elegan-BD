import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, ShieldCheck, Truck, ArrowLeft, ShoppingCart } from 'lucide-react';
import { products, Product } from '../data/products';

interface ProductDetailsProps {
  products: Product[];
  onAddToCart: (product: Product, selectedSize: string) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ products, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = React.useState<string>('');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-black text-white rounded-full"
        >
          Back to Home
        </button>
      </div>
    );
  }

  // Set default size if not selected
  React.useEffect(() => {
    if (product && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  return (
    <div className="bg-white min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-zinc-500 hover:text-black transition-colors mb-10 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-zinc-100 shadow-2xl"
          >
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                ))}
              </div>
              <span className="text-sm font-medium text-zinc-500">({product.reviews} Reviews)</span>
            </div>

            <div className="text-3xl font-bold text-zinc-900 mb-8">
              ৳{product.price.toLocaleString()}
            </div>

            <p className="text-lg text-zinc-600 mb-10 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-900 mb-4">Select Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center font-bold transition-all ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-zinc-200 text-zinc-600 hover:border-zinc-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4 text-sm text-zinc-600">
                <div className="p-2 bg-zinc-100 rounded-lg">
                  <Truck size={20} className="text-zinc-900" />
                </div>
                <span>Fast Delivery across Bangladesh (2-3 Days)</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-zinc-600">
                <div className="p-2 bg-zinc-100 rounded-lg">
                  <ShieldCheck size={20} className="text-zinc-900" />
                </div>
                <span>Premium Quality Guarantee & Easy Returns</span>
              </div>
            </div>

            <button 
              onClick={() => onAddToCart(product, selectedSize)}
              className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl active:scale-[0.98]"
            >
              <ShoppingCart size={24} />
              <span>Add to Cart</span>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
