import React, { useState } from 'react';
import { 
  Eye, EyeOff, Lock, Mail, ArrowRight, 
  Chrome, AlertTriangle, Loader2 
} from 'lucide-react';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { checkUsername, checkPassword } from '../../features/auth/utils/checkCredentialInput';
import logo from '../../assets/logo.png'

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({ username: '', password: '' });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [warning, setWarning] = useState(false);  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (warning) setWarning(false);
  };

  const handleClear = () => {
    setFormData({ username: '', password: '' });
    setErrors({ username: '', password: '' });
    setWarning(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const uError = checkUsername(formData.username);
    const pError = checkPassword(formData.password);

    if (uError || pError) {
      setErrors({
        username: uError ? 'Username has not been entered' : '',
        password: pError ? 'Password has not been entered' : ''
      });
      return;
    }

    setIsLoading(true);
    try {
      const credentials = { 
        username: formData.username, 
        password: formData.password, 
        role: 'user' 
      };

      const res = await login(credentials);

      if (res?.error) {
        handleClear();
        setWarning(true);
      }
    } catch (err) {
      setWarning(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-900">
      
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-20">
        <div className="w-full max-w-[400px] space-y-8">
          
          <div className="flex flex-col">
            <img src={logo} alt="HCMUT" className="h-12 w-auto self-start mb-10 drop-shadow-sm" />
            <h1 className="text-3xl font-extrabold tracking-tight">Đăng nhập</h1>
            <p className="mt-2 text-slate-500 font-medium">Chào mừng bạn quay trở lại hệ thống.</p>
          </div>

          {warning && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 transition-all animate-in fade-in slide-in-from-top-2">
              <AlertTriangle className="shrink-0 mt-0.5" size={20} />
              <p className="text-sm font-medium">
                The credentials you provided cannot be determined to be authentic.
              </p>
            </div>
          )}

          <div className="space-y-6">
            <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 font-semibold text-slate-700 transition-all">
              <Chrome size={20} className="text-blue-500" />
              Tiếp tục với Google
            </button>

            <div className="relative flex items-center justify-center">
              <span className="absolute inset-x-0 border-t border-slate-100"></span>
              <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Hoặc</span>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Username</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder={errors.username || "Enter username"}
                    className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border rounded-xl outline-none transition-all font-medium
                      ${errors.username ? 'border-red-500 placeholder-red-400 bg-red-50' : 'border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500'}`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={errors.password || "Enter password"}
                    className={`w-full pl-12 pr-12 py-3.5 bg-slate-50 border rounded-xl outline-none transition-all font-medium
                      ${errors.password ? 'border-red-500 placeholder-red-400 bg-red-50' : 'border-slate-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500'}`}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <button 
                  disabled={isLoading}
                  className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      <span>Login</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
                
                <button 
                  type="button"
                  onClick={handleClear}
                  className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all text-sm"
                >
                  Clear Fields
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 m-auto max-w-xl p-12 text-white text-center lg:text-left">
          <h2 className="text-5xl font-extrabold mb-6 leading-tight tracking-tight">
            Nền tảng giáo dục <br /> <span className="text-blue-500">thế hệ mới.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed font-medium mb-10">
            Hệ thống học tập thông minh giúp sinh viên kết nối và phát triển năng lực vượt trội.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;