import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import { LogoIcon } from './components/Logo';
import { Product, products as initialProducts } from './data/products';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Checkout } from './pages/Checkout';
import { Admin } from './pages/Admin';
import { Auth } from './pages/Auth';
import { Profile } from './pages/Profile';

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export default function App() {
  const [products, setProducts] = React.useState<Product[]>(() => {
    const saved = localStorage.getItem('elegan_bd_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      localStorage.setItem('elegan_bd_products', JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage:', e);
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('Storage limit reached! Please use smaller images or fewer products. Your changes might not be saved.');
      }
    }
  }, [products]);

  const addToCart = (product: Product, selectedSize?: string) => {
    const size = selectedSize || product.sizes[0];
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number, size: string) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans text-zinc-900 flex flex-col">
        <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home products={products} onAddToCart={(p) => addToCart(p)} />} />
            <Route path="/product/:id" element={<ProductDetails products={products} onAddToCart={addToCart} />} />
            <Route 
              path="/checkout" 
              element={
                <Checkout 
                  items={cartItems} 
                  total={cartTotal} 
                  onOrderComplete={() => setCartItems([])} 
                />
              } 
            />
            <Route path="/admin" element={<Admin products={products} onUpdateProducts={setProducts} />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-black text-white border-t border-zinc-800 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            {/* Branding Section */}
            <div className="mb-16 flex flex-col items-center">
              <Link to="/" className="flex items-center space-x-4 mb-6">
                <LogoIcon className="h-10 w-auto" color="white" />
                <span className="text-3xl font-black tracking-[0.3em] text-white">ELEGAN <span className="text-zinc-500">BD</span></span>
              </Link>
              <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
                Bangladesh’s Trusted Destination for Premium Formal Pants. <br />
                Modern Cuts. Perfect Fit. Exceptional Comfort.
              </p>
              <div className="mt-8 text-sm text-zinc-400 space-y-3">
                <p className="flex flex-col items-center">
                  <span className="font-bold text-white uppercase tracking-widest text-[10px] mb-1">Phone</span>
                  <span className="text-lg">+8801619835133</span>
                </p>
                <p className="flex flex-col items-center">
                  <span className="font-bold text-white uppercase tracking-widest text-[10px] mb-1">Email</span>
                  <span className="text-lg">eleganbd.ltd@gmail.com</span>
                </p>
              </div>
            </div>

            {/* Links Grid - Centered */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-24 mb-16 w-full max-w-4xl">
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Shop</h4>
                <ul className="space-y-4 text-sm text-zinc-400">
                  <li><Link to="/" className="hover:text-white transition-colors">All Products</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Featured</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">New Arrivals</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Discounts</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Support</h4>
                <ul className="space-y-4 text-sm text-zinc-400">
                  <li><Link to="/" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">FAQs</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-xs mb-6">Company</h4>
                <ul className="space-y-4 text-sm text-zinc-400">
                  <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Careers</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full pt-10 border-t border-zinc-800 flex flex-col items-center space-y-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">© 2026 Elegan BD. All Rights Reserved.</p>
            </div>
          </div>
        </footer>

        <Cart 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemove={removeFromCart}
        />
      </div>
    </BrowserRouter>
  );
}
