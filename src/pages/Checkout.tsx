import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, CreditCard, Truck, User } from 'lucide-react';
import { Product } from '../data/products';

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

interface CheckoutProps {
  items: CartItem[];
  total: number;
  onOrderComplete: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ items, total, onOrderComplete }) => {
  const navigate = useNavigate();
  const [isOrdered, setIsOrdered] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [formData, setFormData] = React.useState({
    name: '',
    phone: '',
    address: '',
    transactionId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !formData.transactionId) {
      alert('Please enter the Transaction ID');
      return;
    }

    const orderData = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      items: items.map(i => ({ name: i.name, qty: i.quantity, size: i.selectedSize })),
      total: total + 80,
      customer: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address
      },
      payment: {
        method: paymentMethod,
        transactionId: formData.transactionId
      }
    };

    // Save order to localStorage for Admin to see
    const existingOrders = JSON.parse(localStorage.getItem('elegan_bd_orders') || '[]');
    localStorage.setItem('elegan_bd_orders', JSON.stringify([orderData, ...existingOrders]));

    setIsOrdered(true);
    setTimeout(() => {
      onOrderComplete();
      navigate('/');
    }, 3000);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 size={60} />
          </div>
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">Order Successful!</h2>
          <p className="text-zinc-500 max-w-md text-lg">
            Thank you for shopping with Elegan BD. We've received your order and will contact you shortly for confirmation.
          </p>
          <p className="mt-8 text-sm text-zinc-400">Redirecting to home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-50 min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-zinc-500 hover:text-black transition-colors mb-10 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Cart</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-zinc-100"
          >
            <h2 className="text-3xl font-bold text-zinc-900 mb-10">Shipping Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-zinc-900 font-bold mb-2">
                  <User size={20} />
                  <span>Personal Details</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      placeholder="+8801XXXXXXXXX" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-zinc-900 font-bold mb-2">
                  <Truck size={20} />
                  <span>Delivery Address</span>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Full Address</label>
                  <textarea 
                    required 
                    rows={3} 
                    placeholder="House, Road, Area, City" 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 text-zinc-900 font-bold mb-2">
                  <CreditCard size={20} />
                  <span>Payment Method</span>
                </div>
                
                <div className="space-y-4">
                  {/* COD */}
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all flex items-center justify-between ${paymentMethod === 'cod' ? 'border-black bg-zinc-50' : 'border-zinc-100 hover:border-zinc-200'}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full border-4 ${paymentMethod === 'cod' ? 'border-black' : 'border-zinc-300'}`}></div>
                      <span className="font-bold">Cash on Delivery</span>
                    </div>
                    <span className="text-xs text-zinc-500">Pay when you receive</span>
                  </div>

                  {/* bKash */}
                  <div 
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'bkash' ? 'border-[#D12053] bg-[#D12053]/5' : 'border-zinc-100 hover:border-zinc-200'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full border-4 ${paymentMethod === 'bkash' ? 'border-[#D12053]' : 'border-zinc-300'}`}></div>
                        <span className="font-bold">bKash (01619835133)</span>
                      </div>
                      <img src="https://www.logo.wine/a/logo/BKash/BKash-Logo.wine.svg" alt="bKash" className="h-6" />
                    </div>
                    {paymentMethod === 'bkash' && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-[#D12053]/20 space-y-3">
                        <p className="text-xs text-zinc-600">Please send ৳{(total + 80).toLocaleString()} to <span className="font-bold">01619835133</span> (Personal) and enter the Transaction ID below.</p>
                        <input 
                          required
                          type="text" 
                          placeholder="Enter bKash Transaction ID" 
                          value={formData.transactionId}
                          onChange={e => setFormData({...formData, transactionId: e.target.value})}
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#D12053]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Nagad */}
                  <div 
                    onClick={() => setPaymentMethod('nagad')}
                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === 'nagad' ? 'border-[#F7941D] bg-[#F7941D]/5' : 'border-zinc-100 hover:border-zinc-200'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-4">
                        <div className={`w-4 h-4 rounded-full border-4 ${paymentMethod === 'nagad' ? 'border-[#F7941D]' : 'border-zinc-300'}`}></div>
                        <span className="font-bold">Nagad (01619835133)</span>
                      </div>
                      <img src="https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png" alt="Nagad" className="h-6" />
                    </div>
                    {paymentMethod === 'nagad' && (
                      <div className="mt-4 p-4 bg-white rounded-lg border border-[#F7941D]/20 space-y-3">
                        <p className="text-xs text-zinc-600">Please send ৳{(total + 80).toLocaleString()} to <span className="font-bold">01619835133</span> (Personal) and enter the Transaction ID below.</p>
                        <input 
                          required
                          type="text" 
                          placeholder="Enter Nagad Transaction ID" 
                          value={formData.transactionId}
                          onChange={e => setFormData({...formData, transactionId: e.target.value})}
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#F7941D]"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl hover:shadow-2xl active:scale-[0.98] mt-10"
              >
                Confirm Order (৳{total.toLocaleString()})
              </button>
            </form>
          </motion.div>

          {/* Summary Section */}
          <div className="lg:sticky lg:top-24 h-fit space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
              <h3 className="text-xl font-bold text-zinc-900 mb-8">Order Summary</h3>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-zinc-900 line-clamp-1">{item.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
                        <span className="text-[10px] font-bold text-zinc-400 bg-zinc-100 px-1.5 rounded">Size: {item.selectedSize}</span>
                      </div>
                    </div>
                    <div className="text-sm font-bold text-zinc-900">
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-zinc-100 space-y-4">
                <div className="flex justify-between text-zinc-500">
                  <span>Subtotal</span>
                  <span>৳{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-500">
                  <span>Delivery Charge</span>
                  <span>৳80</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-zinc-900 pt-4">
                  <span>Total</span>
                  <span>৳{(total + 80).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
