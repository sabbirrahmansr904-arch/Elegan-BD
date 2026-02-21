import React from 'react';
import { motion } from 'motion/react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Package, Tag, DollarSign, List, ShieldCheck } from 'lucide-react';
import { Product } from '../data/products';

interface AdminProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

export const Admin: React.FC<AdminProps> = ({ products, onUpdateProducts }) => {
  const [isEditing, setIsEditing] = React.useState<string | null>(null);
  const [editForm, setEditForm] = React.useState<Partial<Product>>({});
  const [isAdding, setIsAdding] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'products' | 'orders'>('products');
  const [orders, setOrders] = React.useState<any[]>([]);
  
  // Security State
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    if (isAuthenticated) {
      const savedOrders = JSON.parse(localStorage.getItem('elegan_bd_orders') || '[]');
      setOrders(savedOrders);
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  const deleteOrder = (id: string) => {
    if (window.confirm('Delete this order?')) {
      const updated = orders.filter(o => o.id !== id);
      setOrders(updated);
      localStorage.setItem('elegan_bd_orders', JSON.stringify(updated));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 1MB to be safe with localStorage)
      if (file.size > 1024 * 1024) {
        alert('Image is too large! Please select an image smaller than 1MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (product: Product) => {
    setIsEditing(product.id);
    setEditForm(product);
  };

  const handleSave = () => {
    // Validation
    if (!editForm.name || !editForm.price || !editForm.image || !editForm.category) {
      alert('Please fill in all required fields (Name, Price, Category, and Image)');
      return;
    }

    try {
      if (isEditing) {
        const updated = products.map(p => p.id === isEditing ? { ...p, ...editForm } as Product : p);
        onUpdateProducts(updated);
        setIsEditing(null);
      } else if (isAdding) {
        const newProduct: Product = {
          ...editForm,
          id: Date.now().toString(),
          rating: 5.0,
          reviews: 0,
          sizes: editForm.category === 'Formal Shirts' ? ['M', 'L', 'XL'] : ['30', '32', '34', '36', '38']
        } as Product;
        onUpdateProducts([...products, newProduct]);
        setIsAdding(false);
      }
      setEditForm({});
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Something went wrong while saving. Please try again.');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onUpdateProducts(products.filter(p => p.id !== id));
    }
  };

  const categories = ['Formal Shirts', 'Formal Pants'];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-zinc-100 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-black" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900">Admin Access</h1>
            <p className="text-zinc-500 text-sm mt-1">Please enter your password to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Password</label>
              <input 
                required
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button 
              type="submit"
              className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg"
            >
              Unlock Dashboard
            </button>
          </form>
          <p className="text-center text-[10px] text-zinc-400 mt-8 uppercase tracking-widest">Secure Admin Portal v2.0</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-zinc-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-6 mt-6">
              <button 
                onClick={() => setActiveTab('products')}
                className={`pb-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'products' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
              >
                Products
              </button>
              <button 
                onClick={() => setActiveTab('orders')}
                className={`pb-2 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${activeTab === 'orders' ? 'border-black text-black' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
              >
                Orders {orders.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white text-[10px] rounded-full">{orders.length}</span>}
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 text-zinc-500 hover:text-black font-bold text-sm transition-colors"
            >
              Logout
            </button>
            {activeTab === 'products' && (
              <button 
                onClick={() => { setIsAdding(true); setEditForm({ category: 'Formal Shirts' }); }}
                className="flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-xl font-bold hover:bg-zinc-800 transition-all shadow-lg"
              >
                <Plus size={20} />
                <span>Add New Product</span>
              </button>
            )}
          </div>
        </div>

        {/* Add/Edit Modal Overlay */}
        {(isEditing || isAdding) && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-zinc-100 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-zinc-900">
                  {isAdding ? 'Add New Product' : 'Edit Product'}
                </h2>
                <button onClick={() => { setIsEditing(null); setIsAdding(false); }} className="text-zinc-400 hover:text-black">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center space-x-2">
                      <Package size={14} />
                      <span>Product Name</span>
                    </label>
                    <input 
                      type="text" 
                      value={editForm.name || ''} 
                      onChange={e => setEditForm({...editForm, name: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center space-x-2">
                      <DollarSign size={14} />
                      <span>Price (৳)</span>
                    </label>
                    <input 
                      type="number" 
                      value={editForm.price || ''} 
                      onChange={e => setEditForm({...editForm, price: Number(e.target.value)})}
                      className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center space-x-2">
                    <Tag size={14} />
                    <span>Category</span>
                  </label>
                  <select 
                    value={editForm.category || ''} 
                    onChange={e => setEditForm({...editForm, category: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center space-x-2">
                    <ImageIcon size={14} />
                    <span>Product Image</span>
                  </label>
                  <div className="flex items-start space-x-4">
                    <div className="w-32 h-32 rounded-xl bg-zinc-100 border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {editForm.image ? (
                        <img src={editForm.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="text-zinc-300" size={32} />
                      )}
                    </div>
                    <div className="flex-grow space-y-3">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden" 
                        id="image-upload"
                      />
                      <label 
                        htmlFor="image-upload"
                        className="inline-block px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-lg text-sm font-bold cursor-pointer transition-colors"
                      >
                        Choose File
                      </label>
                      <p className="text-[10px] text-zinc-400 leading-tight">
                        Upload a high-quality image from your device. <br />
                        Recommended size: 600x800px.
                      </p>
                      <div className="pt-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Or use URL</label>
                        <input 
                          type="text" 
                          value={editForm.image || ''} 
                          onChange={e => setEditForm({...editForm, image: e.target.value})}
                          className="w-full px-3 py-2 mt-1 bg-zinc-50 border border-zinc-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-black"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 flex items-center space-x-2">
                    <List size={14} />
                    <span>Description</span>
                  </label>
                  <textarea 
                    rows={4}
                    value={editForm.description || ''} 
                    onChange={e => setEditForm({...editForm, description: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-black outline-none resize-none"
                  />
                </div>
              </div>

              <div className="p-8 bg-zinc-50 border-t border-zinc-100 flex justify-end space-x-4">
                <button 
                  onClick={() => { setIsEditing(null); setIsAdding(false); }}
                  className="px-6 py-3 text-zinc-500 font-bold hover:text-black"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-8 py-3 bg-black text-white rounded-xl font-bold hover:bg-zinc-800 transition-all flex items-center space-x-2"
                >
                  <Save size={20} />
                  <span>Save Changes</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'products' ? (
          <div className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-zinc-400">Product</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-zinc-400">Category</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-zinc-400">Price</th>
                  <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-zinc-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {products.filter(p => p && p.id).map((product) => (
                  <tr key={product.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <div className="font-bold text-zinc-900">{product.name}</div>
                          <div className="text-xs text-zinc-400 mt-1">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-xs font-bold uppercase tracking-widest">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="font-bold text-zinc-900">৳{product.price.toLocaleString()}</div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white p-20 rounded-3xl border border-zinc-100 text-center">
                <p className="text-zinc-400 font-medium">No orders found yet.</p>
              </div>
            ) : (
              orders.map((order) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={order.id} 
                  className="bg-white rounded-3xl shadow-sm border border-zinc-100 overflow-hidden"
                >
                  <div className="p-6 md:p-8 bg-zinc-50 border-b border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-bold text-zinc-900">Order #{order.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${order.payment.method === 'cod' ? 'bg-zinc-200 text-zinc-600' : order.payment.method === 'bkash' ? 'bg-[#D12053] text-white' : 'bg-[#F7941D] text-white'}`}>
                          {order.payment.method}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">{order.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-lg font-black text-zinc-900">৳{order.total.toLocaleString()}</div>
                        <div className="text-[10px] text-zinc-400 uppercase font-bold">Total Amount</div>
                      </div>
                      <button 
                        onClick={() => deleteOrder(order.id)}
                        className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Customer Info */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Customer Details</h4>
                      <div className="space-y-2">
                        <p className="text-sm font-bold text-zinc-900">{order.customer.name}</p>
                        <p className="text-sm text-zinc-600">{order.customer.phone}</p>
                        <p className="text-sm text-zinc-500 leading-relaxed">{order.customer.address}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Items Ordered</h4>
                      <div className="space-y-3">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center text-sm">
                            <span className="text-zinc-600">{item.name} <span className="text-zinc-400 font-medium">(Size: {item.size})</span></span>
                            <span className="font-bold text-zinc-900">x{item.qty}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment Details */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Payment Info</h4>
                      <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                        <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Method</p>
                        <p className="text-sm font-black text-zinc-900 uppercase">{order.payment.method}</p>
                        
                        {order.payment.transactionId && (
                          <div className="mt-4">
                            <p className="text-xs font-bold text-zinc-500 uppercase mb-1">Transaction ID</p>
                            <p className="text-sm font-black text-blue-600 break-all">{order.payment.transactionId}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
