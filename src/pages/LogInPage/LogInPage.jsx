import React, { useState } from 'react';
import { 
  Eye, EyeOff, Lock, Mail, ArrowRight, 
  Chrome, AlertTriangle, Loader2, ArrowUpRight 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { checkPassword } from '../../features/auth/utils/checkCredentialInput';
import logo from '../../assets/logo.png';

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(false);

  // Link ảnh Unsplash - Kiến trúc hiện đại, sạch sẽ, hoạt động ổn định
  const BK_IMAGE_URL = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (warning) setWarning(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const pError = checkPassword(formData.password);

    if ( pError) {
      setErrors({
        password: pError ? 'Yêu cầu mật khẩu' : ''
      });
      return;
    }

    setIsLoading(true);
    try {
      await login({ ...formData, role: 'user' });
    } catch (err) {
      setWarning(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex bg-[#050810] font-sans overflow-hidden text-slate-200">
      
      {/* BACKGROUND DECORATION (Mảnh dẻ và tinh tế hơn) */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, size: '50px 50px' }} />

      {/* CỘT TRÁI: MINIMAL MASKING (50%) */}
      <div className="hidden lg:flex w-1/2 relative p-10 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full h-[85vh] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
        >
          <img 
            src={BK_IMAGE_URL} 
            className="w-full h-full object-cover grayscale brightness-[0.5] contrast-[1.1]"
            alt="Office background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-16 left-16 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1.5px] bg-emerald-500"></span>
              <span className="text-[10px] font-bold tracking-[0.3em] text-emerald-500 uppercase">Hệ thống giáo dục thông minh</span>
            </div>
            <h2 className="text-5xl font-[1000] tracking-tight leading-tight uppercase italic">
              <span className="text-emerald-500">CONQUER</span><br />
              <span className="font-light text-slate-400">Bách Khoa 2026.</span>
            </h2>
          </div>
        </motion.div>
      </div>

      {/* CỘT PHẢI: LOGIN FORM (50%) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[400px] w-full mx-auto space-y-12"
        >
          <div className="space-y-3">
            <img src={logo} className="h-7 w-auto brightness-0 invert opacity-80" alt="Logo" />
            <h3 className="text-3xl font-[1000] tracking-tight uppercase italic">Đăng nhập</h3>
            <p className="text-slate-500 text-sm font-medium leading-relaxed italic">Vui lòng cung cấp khóa bảo mật để tiếp tục.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Tên tài khoản</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  type='email'
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={errors.email || "Nhập email"}
                  className={`w-full bg-transparent border-b border-white/10 pl-7 py-3 outline-none transition-all font-semibold text-lg
                    ${errors.email ? 'border-red-500/50' : 'focus:border-emerald-500'}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Mật mã bảo mật</label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={errors.password || "••••••••"}
                  className={`w-full bg-transparent border-b border-white/10 pl-7 py-3 outline-none transition-all font-semibold text-lg
                    ${errors.password ? 'border-red-500/50' : 'focus:border-emerald-500'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {warning && (
              <div className="text-red-400 bg-red-400/5 p-3 rounded-xl border border-red-400/10 text-[10px] font-bold uppercase tracking-widest flex gap-2 items-center italic">
                <AlertTriangle size={14} /> Thông tin xác thực không chính xác.
              </div>
            )}

            <div className="flex flex-col gap-4 pt-4">
              <button 
                disabled={isLoading}
                className="group relative w-full py-5 bg-emerald-500 text-slate-950 font-black rounded-xl overflow-hidden transition-all flex items-center justify-center hover:bg-emerald-400"
              >
                <span className="tracking-[0.2em] text-[11px] uppercase">Xác thực hệ thống</span>
                {isLoading ? <Loader2 className="ml-3 animate-spin" size={18} /> : <ArrowRight className="ml-3 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" size={18} />}
              </button>

              <button type="button" className="w-full flex items-center justify-center gap-2 py-4 border border-white/5 rounded-xl hover:bg-white/5 text-[10px] font-bold text-slate-500 tracking-widest uppercase transition-all">
                <Chrome size={14} className="text-emerald-500" /> Google Account
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Subtle Glows */}
      <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-emerald-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] left-[45%] w-64 h-64 bg-emerald-500/5 blur-[80px] pointer-events-none" />
    </div>
  );
};

export default LoginPage;