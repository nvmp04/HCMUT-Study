import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen bg-slate-950 text-white font-sans overflow-hidden">
      
      {/* BACKGROUND TEXT (Mờ ảo tạo chiều sâu) */}
      <div className="absolute top-20 left-10 opacity-[0.02] select-none pointer-events-none">
        <h1 className="text-[20rem] font-black leading-none">EXPERT</h1>
      </div>

      {/* MAIN CONTENT CONTAINER */}
      <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-screen items-center">
        
        {/* LEFT COLUMN: 40% - Typography & Narrative */}
        <div className="w-full lg:w-[45%] px-8 md:px-16 pt-32 pb-20 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-emerald-500"></span>
              <span className="text-[10px] font-black tracking-[0.4em] text-emerald-500 uppercase">Premium Learning Platform</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-[1000] tracking-tighter leading-[1.1] uppercase">
              KẾT NỐI. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-light italic">HỌC TẬP.</span> <br />
              BỨT PHÁ.
            </h1>

            <p className="max-w-md text-slate-400 text-lg leading-relaxed font-light">
              Đồng hành cùng những Mentor hàng đầu để chinh phục mọi mục tiêu học thuật và sự nghiệp. Trải nghiệm giáo dục cá nhân hóa ở cấp độ cao nhất.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 pt-8">
              <button 
                onClick={() => navigate('/student/schedule')}
                className="group relative px-10 py-5 bg-emerald-500 text-slate-950 font-black rounded-full overflow-hidden transition-all hover:pr-14"
              >
                <span className="relative z-10 tracking-widest text-sm">BẮT ĐẦU NGAY</span>
                <ArrowRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={20} />
              </button>

              <button className="flex items-center gap-2 text-xs font-black tracking-widest text-slate-500 hover:text-white transition-colors uppercase">
                Khám phá Mentor <ArrowUpRight size={16} className="text-emerald-500" />
              </button>
            </div>
          </motion.div>

          {/* Mini Stats Line */}
          <div className="mt-24 flex gap-12 items-center opacity-50">
            <div className="flex flex-col">
              <span className="text-xl font-black">1.2K+</span>
              <span className="text-[8px] font-bold uppercase tracking-widest">Active Mentors</span>
            </div>
            <div className="w-[1px] h-8 bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-xl font-black">98%</span>
              <span className="text-[8px] font-bold uppercase tracking-widest">Success Rate</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 55% - Creative Image Masking (Lấp đầy khoảng trống) */}
        <div className="w-full lg:w-[55%] h-full relative p-8 lg:p-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative w-full h-[600px] lg:h-[800px] rounded-[4rem] overflow-hidden group"
          >
            {/* Ảnh Portrait chất lượng cao, Grayscale sang trọng */}
            <img 
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070" 
              className="w-full h-full object-cover grayscale brightness-75 transition-transform duration-[2s] group-hover:scale-110"
              alt="Mentorship interaction"
            />
            
            {/* Lớp phủ màu Gradient tinh tế */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-transparent to-transparent mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

            {/* Floating Info Tag (Nhấn mạnh tính kết nối) */}
            <div className="absolute bottom-12 left-12 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl max-w-xs">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="text-emerald-500" fill="currentColor" />)}
              </div>
              <p className="text-sm font-medium text-slate-200">
                "Hệ thống giúp tôi tìm đúng người dẫn dắt chỉ trong vài phút. Kết quả vượt mong đợi."
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest mt-4 text-emerald-500">— Senior Mentor @ Tech Corp</p>
            </div>
          </motion.div>

          {/* Decorative Circle (Lấp đầy các góc trống) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full"></div>
        </div>
      </div>

      {/* VERTICAL BRANDING */}
      <div className="absolute right-10 bottom-10 hidden xl:block">
        <p className="text-[10px] font-black text-white/10 vertical-text tracking-[1em] uppercase">
          Learning Evolution • 2026
        </p>
      </div>
    </section>
  );
}