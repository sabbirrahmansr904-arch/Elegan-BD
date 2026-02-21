import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Package, LogOut, Calendar, MapPin, Phone, CreditCard } from 'lucide-react';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  const [orders, setOrders] = React.useState<any[]>([]);

  React.useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('elegan_bd_current_user') || 'null');
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    setUser(currentUser);

    const allOrders = JSON.parse(localStorage.getItem('elegan_bd_orders') || '[]');
    // Filter orders for this user
    const userOrders = allOrders.filter((o: any) => o.customer.email === currentUser.email);
    setOrders(userOrders);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('elegan_bd_current_user');
    window.dispatchEvent(new Event('auth-change'));
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-50 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Sidebar: Profile Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-zinc-100 text-center"
            >
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full bg-zinc-100 border-4 border-white shadow-xl overflow-hidden mx-auto">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-100">
                      <User size={48} className="text-zinc-300" />
                    </div>
                  )}
                </div>
              </div>
              <h2 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">{user.name}</h2>
              <p className="text-zinc-400 text-sm mt-1">{user.email}</p>
              
              <div className="mt-10 pt-10 border-t border-zinc-50 space-y-4">
                <button 
                  onClick={handleLogout}
                  className="w-full py-4 bg-zinc-50 text-zinc-500 rounded-2xl font-bold text-sm hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center space-x-2"
                >
                  <LogOut size={18} />
                  <span>Logout Account</span>
                </button>
              </div>
            </motion.div>

            <div className="bg-black p-8 rounded-[2.5rem] text-white shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Account Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-black">{orders.length}</div>
                  <div className="text-[10px] uppercase font-bold text-zinc-500 mt-1">Total Orders</div>
                </div>
                <div>
                  <div className="text-3xl font-black">৳{orders.reduce((sum, o) => sum + o.total, 0).toLocaleString()}</div>
                  <div className="text-[10px] uppercase font-bold text-zinc-500 mt-1">Total Spent</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content: Order History */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">Order History</h3>
              <span className="px-4 py-1.5 bg-zinc-100 text-zinc-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                {orders.length} Orders
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-20 rounded-[2.5rem] border border-zinc-100 text-center">
                <Package className="mx-auto text-zinc-200 mb-6" size={64} />
                <h4 className="text-xl font-bold text-zinc-900">No orders yet</h4>
                <p className="text-zinc-400 mt-2">Your premium formal collection is waiting for you.</p>
                <button 
                  onClick={() => navigate('/')}
                  className="mt-8 px-8 py-4 bg-black text-white rounded-2xl font-bold text-sm hover:bg-zinc-800 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={order.id} 
                    className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-100 overflow-hidden group hover:shadow-md transition-all"
                  >
                    <div className="p-8 border-b border-zinc-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                      <div className="flex items-center space-x-6">
                        <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-black group-hover:text-white transition-colors">
                          <Package size={24} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-black text-zinc-900">Order #{order.id}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${order.payment.method === 'cod' ? 'bg-zinc-100 text-zinc-500' : 'bg-green-100 text-green-600'}`}>
                              {order.payment.method}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mt-1 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                            <span className="flex items-center space-x-1">
                              <Calendar size={12} />
                              <span>{order.date}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-zinc-900">৳{order.total.toLocaleString()}</div>
                        <div className="text-[10px] text-zinc-400 uppercase font-black tracking-widest">Paid Total</div>
                      </div>
                    </div>

                    <div className="p-8 bg-zinc-50/30 grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Items</h4>
                        <div className="space-y-3">
                          {order.items.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center text-sm">
                              <span className="text-zinc-600 font-medium">{item.name} <span className="text-zinc-400 text-xs">(Size: {item.size})</span></span>
                              <span className="font-black text-zinc-900">x{item.qty}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Shipping To</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 text-sm font-bold text-zinc-900">
                            <MapPin size={14} className="text-zinc-400" />
                            <span>{order.customer.address}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-zinc-500">
                            <Phone size={14} className="text-zinc-400" />
                            <span>{order.customer.phone}</span>
                          </div>
                          {order.payment.transactionId && (
                            <div className="flex items-center space-x-2 text-sm text-blue-600 font-bold mt-2">
                              <CreditCard size={14} />
                              <span>TXID: {order.payment.transactionId}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
