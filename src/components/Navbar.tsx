import React from 'react';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { LogoIcon } from './Logo';
import { cn } from '../lib/utils';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black text-white border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Menu Button (3 lines) */}
          <div className="flex items-center">
            <button 
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            {/* Desktop Nav Links (Optional, keeping them subtle) */}
            <div className="hidden lg:flex items-center ml-8 space-x-6">
              <Link to="/" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Shop</Link>
              <Link to="/" className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">New</Link>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
              <LogoIcon className="h-7 w-auto" color="white" />
              <span className="text-xl font-black tracking-[0.2em] text-white uppercase">Elegan BD</span>
            </Link>
          </div>

          {/* Right: User Panel & Actions */}
          <div className="flex items-center space-x-2 sm:space-x-5">
            <button className="p-2 text-zinc-400 hover:text-white transition-colors hidden sm:block">
              <Search size={22} />
            </button>
            <button className="flex items-center space-x-2 p-2 text-zinc-400 hover:text-white transition-colors group">
              <User size={22} />
              <span className="hidden md:block text-xs font-bold uppercase tracking-widest">Account</span>
            </button>
            <button 
              onClick={onCartClick}
              className="p-2 text-zinc-400 hover:text-white transition-colors relative"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 top-20 bg-black z-40 md:w-80 border-r border-zinc-800"
          >
            <div className="px-6 py-10 space-y-8">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold text-white hover:text-zinc-400 transition-colors">Collections</Link>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold text-white hover:text-zinc-400 transition-colors">Formal Shirts</Link>
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold text-white hover:text-zinc-400 transition-colors">Formal Pants</Link>
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block text-2xl font-bold text-zinc-500 hover:text-white transition-colors pt-4 border-t border-zinc-800/50">Admin Panel</Link>
              
              <div className="pt-10 border-t border-zinc-800">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-zinc-500 hover:text-white">Track Order</Link>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-zinc-500 hover:text-white mt-4">Support</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
