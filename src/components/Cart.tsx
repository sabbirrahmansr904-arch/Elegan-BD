import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number, size: string) => void;
  onRemove: (id: string, size: string) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="text-zinc-900" />
                <h2 className="text-xl font-bold text-zinc-900">Your Cart</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400">
                    <ShoppingBag size={40} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-zinc-900">Your cart is empty</h3>
                    <p className="text-zinc-500">Looks like you haven't added anything yet.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-6 py-2 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex space-x-4">
                    <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border border-zinc-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-zinc-900 line-clamp-1">{item.name}</h4>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded mt-1 inline-block">
                            Size: {item.selectedSize}
                          </span>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id, item.selectedSize)}
                          className="text-zinc-400 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-sm text-zinc-500 mt-1">৳{item.price.toLocaleString()}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-zinc-200 rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1, item.selectedSize)}
                            className="p-1 hover:bg-zinc-50 transition-colors text-zinc-500"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1, item.selectedSize)}
                            className="p-1 hover:bg-zinc-50 transition-colors text-zinc-500"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <span className="font-bold text-zinc-900">৳{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-zinc-600">
                    <span>Subtotal</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span>Shipping</span>
                    <span className="text-zinc-900 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-zinc-900 pt-2 border-t border-zinc-200">
                    <span>Total</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                </div>
                <Link 
                  to="/checkout"
                  onClick={onClose}
                  className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-lg shadow-zinc-900/20 text-center block"
                >
                  Checkout Now
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
