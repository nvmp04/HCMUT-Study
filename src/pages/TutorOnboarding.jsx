import React from 'react';
import { ArrowLeft, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { useRoleSwitch } from '../features/auth/hooks/useRoleSwitch';

export function TutorOnboarding() {
  const { switchRole } = useRoleSwitch();

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" 
          className="w-full h-full object-cover opacity-25 grayscale" 
          alt="Professional Background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-slate-950/70 shadow-inner"></div>
      </div>

      {/* MAIN LAYOUT */}
      <main className="relative z-10 max-w-[1400px] mx-auto min-h-[80vh] flex flex-col lg:flex-row items-center justify-between px-8 md:px-16 gap-20 pt-10 pb-20">
        
        {/* LEFT: THE SLOGAN (Refined Typography) */}
        <div className="w-full lg:w-3/5 flex flex-col items-start">
          <h1 className="text-5xl md:text-7xl xl:text-[5.5rem] font-black tracking-tight leading-[1.1] text-white">
            CHIA SẺ. <br />
            DẪN DẮT. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">THU NHẬP.</span>
          </h1>
          
          <p className="max-w-md text-slate-400 text-base md:text-lg font-medium leading-relaxed pt-8 border-l-2 border-emerald-500/30 pl-6 mt-8">
            Đừng chỉ giữ kiến thức cho riêng mình. Hãy biến kinh nghiệm của một kỹ sư Bách Khoa thành giá trị thực tế.
          </p>

          <div className="flex gap-12 mt-12">
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white">25M+</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Potential / Mo</span>
             </div>
             <div className="flex flex-col">
                <span className="text-3xl font-black text-white">5000+</span>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1">Active Students</span>
             </div>
          </div>
        </div>

        {/* RIGHT: THE ACTION AREA (Clean Emerald Focus) */}
        <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-end">
          <div className="relative group w-full max-w-sm">
            
            {/* Glow Subtle */}
            <div className="absolute -inset-10 bg-emerald-500/10 rounded-full blur-[80px] group-hover:bg-emerald-500/20 transition-all duration-700"></div>
            
            <div className="relative flex flex-col gap-12">
              {/* THE BIG BUTTON */}
              <button 
                onClick={() => window.location.href = '/tutor-registration'}
                className="w-full py-7 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-full font-black text-xl uppercase tracking-[0.15em] flex items-center justify-center gap-4 transition-all transform hover:scale-[1.03] active:scale-95 shadow-[0_25px_50px_-12px_rgba(16,185,129,0.4)]"
              >
                ĐĂNG KÝ GIA SƯ
                <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Support Info (Minimal text, no boxes) */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 justify-center lg:justify-end text-slate-400 group/item cursor-default hover:text-emerald-400 transition-colors">
                   <div className="text-right">
                      <p className="text-[11px] font-black uppercase tracking-wider">Hồ sơ ưu tiên</p>
                      <p className="text-[9px] font-medium opacity-60 uppercase">Dành cho top mentor tuần</p>
                   </div>
                   <Star size={18} className="text-emerald-500/50 group-hover/item:text-emerald-500 transition-colors" fill="currentColor" />
                </div>

                <div className="flex items-center gap-4 justify-center lg:justify-end text-slate-400 group/item cursor-default hover:text-emerald-400 transition-colors">
                   <div className="text-right">
                      <p className="text-[11px] font-black uppercase tracking-wider">Xác thực 24h</p>
                      <p className="text-[9px] font-medium opacity-60 uppercase">Quy trình chuẩn ISO 2026</p>
                   </div>
                   <ShieldCheck size={18} className="text-emerald-500/50 group-hover/item:text-emerald-500 transition-colors" />
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* FOOTER METRICS */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <p className="text-[9px] font-black text-white/10 tracking-[0.8em] uppercase">
          Elite Polytechnic Network • 2026
        </p>
      </div>
    </div>
  );
}