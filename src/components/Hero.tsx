import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleShopNow = () => {
    if (location.pathname !== '/') {
      navigate('/');
      // Small delay to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById('products-section');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('products-section');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-[450px] md:h-[600px] bg-[#0a0a0a] overflow-hidden">
      {/* Background Image - Using a placeholder that mimics the dark, moody, formal vibe of the provided image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop" 
          alt="Elegan BD Banner" 
          className="w-full h-full object-cover opacity-50 object-right md:object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      </div>

      {/* Content Overlay - Centered typography and layout */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Main Title */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mb-8 leading-[1.1] tracking-tight">
            Premium Men's Formal <br /> 
            <span className="italic">Collection</span>
          </h1>

          {/* Shop Now Button - Box style from the image */}
          <button 
            onClick={handleShopNow}
            className="group relative px-16 py-5 border border-white text-white overflow-hidden transition-all duration-500"
          >
            <span className="relative z-10 text-sm md:text-base font-bold uppercase tracking-[0.5em] group-hover:text-black transition-colors duration-500">
              Shop Now
            </span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>

      {/* Subtle smoke/atmosphere effect overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_70%)]" />
    </div>
  );
};
