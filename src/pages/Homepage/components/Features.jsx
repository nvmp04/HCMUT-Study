import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Video, PenTool, BarChart3, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Features() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      icon: <Zap size={20} />,
      title: 'Smart Matching',
      desc: 'Thuật toán AI kết nối bạn với Mentor phù hợp nhất dựa trên mục tiêu, phong cách học và lịch trình cá nhân.',
      detail: 'Hệ thống tự động phân tích hàng ngàn Profile để tìm ra mảnh ghép hoàn hảo cho lộ trình của bạn.'
    },
    {
      icon: <Video size={20} />,
      title: 'Lớp học trực tuyến',
      desc: 'HD Video tích hợp sẵn các công cụ cộng tác thời gian thực, chia sẻ màn hình và chat nội bộ.',
      detail: 'Không cần cài đặt thêm phần mềm. Mọi thứ diễn ra mượt mà ngay trên trình duyệt.'
    },
    {
      icon: <PenTool size={20} />,
      title: 'Bảng trắng tương tác',
      desc: 'Công cụ vẽ, viết phương trình và giải bài tập cùng nhau trên một không gian vô cực.',
      detail: 'Lưu lại mọi ghi chú sau buổi học dưới dạng PDF chất lượng cao để ôn tập dễ dàng.'
    },
    {
      icon: <BarChart3 size={20} />,
      title: 'Ghi lại phiên học',
      desc: 'Mọi buổi học đều được ghi hình tự động và lưu trữ trên Cloud để bạn xem lại bất cứ khi nào.',
      detail: 'Tìm kiếm nội dung bài học thông qua Transcript thông minh được tạo bởi AI.'
    }
  ];

  return (
    // ĐÃ ĐỔI: bg-[#0f172a] (Navy chuẩn) thay cho màu xanh lá cũ
    <section id="features" className="py-32 bg-[#0f172a] text-white overflow-hidden relative">
      
      {/* Background Decor - Noise & Glow */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full"></div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-16 relative z-10">
        
        <div className="mb-24">
          <p className="text-emerald-400 font-black text-[10px] tracking-[0.5em] uppercase mb-4 text-center lg:text-left">Tech Stack</p>
          <h2 className="text-5xl md:text-7xl font-[1000] tracking-tighter uppercase leading-none text-center lg:text-left">
            CÔNG CỤ <br /> <span className="text-emerald-500/50 italic font-light">thế hệ mới.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: Feature Tabs */}
          <div className="lg:col-span-5 space-y-4">
            {features.map((f, i) => (
              <div 
                key={i}
                onMouseEnter={() => setActiveTab(i)}
                className={`p-8 rounded-3xl cursor-pointer transition-all duration-500 border ${
                  activeTab === i 
                  ? 'bg-white/5 border-emerald-500/30 shadow-2xl shadow-emerald-500/10' 
                  : 'bg-transparent border-transparent opacity-40 grayscale'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`p-3 rounded-xl ${activeTab === i ? 'bg-emerald-500 text-slate-950' : 'bg-white/10 text-white'}`}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">{f.title}</h3>
                    <p className="text-slate-400 font-light leading-snug">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Feature Preview (Visual) */}
          <div className="lg:col-span-7 sticky top-32 h-[500px] lg:h-[600px]">
            {/* ĐÃ ĐỔI: bg-slate-900/50 để nổi bật trên nền Navy */}
            <div className="w-full h-full bg-slate-900/50 rounded-[3rem] border border-white/10 overflow-hidden relative shadow-[0_0_100px_-20px_rgba(16,185,129,0.2)]">
              
              {/* Giả lập giao diện Dashboard */}
              <div className="absolute top-0 w-full h-12 bg-white/5 border-b border-white/5 flex items-center px-6 gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                 <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
              </div>

              <div className="p-12 pt-20 h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col h-full justify-between"
                  >
                    <div className="space-y-8">
                       <div className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400">
                         Feature Detail
                       </div>
                       <h4 className="text-4xl font-black leading-tight uppercase italic text-emerald-500">
                         {features[activeTab].title}
                       </h4>
                       <p className="text-2xl text-slate-400 font-light leading-relaxed">
                         {features[activeTab].detail}
                       </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-12">
                       <div className="flex -space-x-4">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full border-2 border-[#0f172a] bg-slate-800 overflow-hidden">
                               <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="avatar" className="grayscale hover:grayscale-0 transition-all cursor-pointer"/>
                            </div>
                          ))}
                          <div className="w-12 h-12 rounded-full border-2 border-[#0f172a] bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs italic">
                            +1k
                          </div>
                       </div>
                       <button className="px-8 py-4 bg-emerald-500 text-slate-950 font-black rounded-full flex items-center gap-3 hover:scale-105 transition-transform">
                          DÙNG THỬ <ChevronRight size={18} strokeWidth={3} />
                       </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}