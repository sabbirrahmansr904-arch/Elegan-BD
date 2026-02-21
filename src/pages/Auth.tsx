import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, Camera, ArrowRight } from 'lucide-react';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = React.useState(true);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    name: '',
    profilePic: ''
  });
  const [error, setError] = React.useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert('Image too large! Max 500KB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('elegan_bd_users') || '[]');

    if (isLogin) {
      const user = users.find((u: any) => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('elegan_bd_current_user', JSON.stringify(user));
        window.dispatchEvent(new Event('auth-change'));
        navigate('/profile');
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (users.find((u: any) => u.email === formData.email)) {
        setError('Email already exists');
        return;
      }
      const newUser = {
        id: Date.now().toString(),
        ...formData
      };
      localStorage.setItem('elegan_bd_users', JSON.stringify([...users, newUser]));
      localStorage.setItem('elegan_bd_current_user', JSON.stringify(newUser));
      window.dispatchEvent(new Event('auth-change'));
      navigate('/profile');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-zinc-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-zinc-900 uppercase tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            {isLogin ? 'Enter your details to access your profile' : 'Join Elegan BD for a premium experience'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div className="flex flex-col items-center mb-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-zinc-100 border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden">
                  {formData.profilePic ? (
                    <img src={formData.profilePic} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <User className="text-zinc-300" size={40} />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-black text-white rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg">
                  <Camera size={16} />
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-3">Upload Profile Picture</span>
            </div>
          )}

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input 
                  required
                  type="text" 
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-12 pr-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                required
                type="email" 
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full pl-12 pr-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                required
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full pl-12 pr-5 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-bold text-center">{error}</p>}

          <button 
            type="submit"
            className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-xl flex items-center justify-center space-x-3 group"
          >
            <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-sm font-bold text-zinc-400 hover:text-black transition-colors"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
