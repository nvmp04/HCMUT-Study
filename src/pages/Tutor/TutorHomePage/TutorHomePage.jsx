import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Clock, Users, Star, ArrowUpRight, Video, 
  MoreHorizontal, Wallet, CheckCircle2, XCircle, BrainCircuit, MessageSquare 
} from "lucide-react";
import { useProfile } from "../../../features/profile/hooks/useProfile";
import { LoadingModal } from '../../../components/LoadingModal';
import { motion, animate } from 'framer-motion';

// --- COMPONENT ĐẾM SỐ TỪ 0 -> N ---
const AnimatedNumber = ({ value, duration = 1, decimals = 0, format = false }) => {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: duration,
      ease: "easeOut",
      onUpdate(currentValue) {
        let displayValue = currentValue.toFixed(decimals);
        if (format) {
          // Format tiền tệ (VD: 12500000 -> 12,500,000)
          displayValue = Number(displayValue).toLocaleString('vi-VN');
        }
        node.textContent = displayValue;
      }
    });

    return () => controls.stop();
  }, [value, duration, decimals, format]);

  return <span ref={nodeRef}>0</span>;
};

export default function TutorHomePage() {
  const { data, isLoading } = useProfile();

  if (isLoading) return <LoadingModal />;

  const tutorName = data?.tutor?.name?.split(' ').pop() || "Gia sư";
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-400 p-6 md:pl-28 font-sans selection:bg-violet-500/30 overflow-x-hidden">
      {/* Background Glow - Đổi sang Violet */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-500/[0.02] blur-[150px] rounded-full pointer-events-none" 
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[1300px] px-2 py-16 mx-auto"
      >
        {/* HEADER */}
        <motion.div variants={itemVariants} className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-200">
              Xin chào, {tutorName}
            </h1>
            <p className="text-slate-500 text-sm mt-1">Hôm nay bạn có <span className="text-violet-400 font-bold">3 ca dạy</span> và <span className="text-violet-400 font-bold">2 yêu cầu</span> mới.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-8">
          
          {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* 1. NEXT SESSION HERO */}
            <motion.div variants={itemVariants} className="bg-[#1e293b]/20 border border-white/[0.05] rounded-md overflow-hidden backdrop-blur-sm">
              <div className="px-6 py-3 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
                <span className="text-[9px] font-black text-violet-500/70 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse"></span> Ca dạy tiếp theo
                </span>
                <span className="text-xs font-medium text-slate-500">Còn 45 phút</span>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between gap-10">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-slate-200 tracking-tight mb-6">
                      Cấu trúc Dữ liệu & Giải thuật nâng cao
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-1">
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Học viên</span>
                          <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                            <Users size={14} className="text-violet-500/50"/> Lê Văn B
                          </p>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Thời lượng</span>
                          <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                            <Clock size={14} className="text-violet-500/50"/> 120 phút
                          </p>
                       </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="w-full md:w-auto px-6 py-4 bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] text-slate-300 transition-all rounded-sm text-xs font-black uppercase tracking-widest">
                      Tài liệu
                    </button>
                    <button className="w-full md:w-auto px-10 py-4 bg-violet-600 hover:bg-violet-500 text-white transition-all rounded-sm flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest shadow-lg shadow-violet-900/20">
                      <Video size={16} /> Mở phòng
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 2. PENDING REQUESTS */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <h3 className="font-bold text-slate-600 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Calendar size={14} className="text-violet-500/40" /> Yêu cầu đặt lịch mới
                </h3>
              </div>
              <div className="grid gap-3">
                {[
                  { name: "Trần Thị C", topic: "Kỹ năng React Hooks", time: "Ngày mai, 19:00" },
                  { name: "Phạm Văn D", topic: "Sửa lỗi System Design", time: "12/04/2026, 09:00" }
                ].map((req, idx) => (
                  <div key={idx} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white/[0.01] border border-white/[0.03] rounded-sm hover:border-violet-500/20 transition-all">
                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                      <div className="w-10 h-10 bg-slate-800 rounded-sm flex items-center justify-center text-slate-500 font-bold text-xs">
                        {req.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-300">{req.name}</div>
                        <div className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{req.topic} • <span className="text-violet-400/70">{req.time}</span></div>
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                       <button className="flex-1 sm:flex-none px-4 py-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all">Từ chối</button>
                       <button className="flex-1 sm:flex-none px-6 py-2 bg-violet-600/20 text-violet-400 hover:bg-violet-600/40 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                         <CheckCircle2 size={14} /> Chấp nhận
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 3. AI TEACHING INSIGHTS */}
            <motion.div variants={itemVariants} className="space-y-4 pt-4">
              <h3 className="font-bold text-slate-600 text-[10px] uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                <BrainCircuit size={14} className="text-violet-500/40" /> Phân tích học viên (AI)
              </h3>
              <div className="p-5 border border-white/[0.02] bg-white/[0.01] rounded-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-violet-500/50"></div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Học viên <span className="text-violet-400 font-medium">Lê Văn B</span> thường gặp khó khăn ở các bài toán về <span className="text-slate-200 bg-white/5 px-1 rounded">Dynamic Programming</span>. Tốc độ hoàn thành bài tập phần này chậm hơn 40% so với trung bình. 
                </p>
                <p className="text-[11px] text-slate-500 mt-3 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span> Gợi ý: Hãy chuẩn bị thêm 2 bài tập ví dụ trực quan cho ca dạy chiều nay.
                </p>
              </div>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN (STATS & EARNINGS) --- */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* 1. EARNINGS WALLET */}
            <motion.div variants={itemVariants} className="bg-violet-900/20 border border-violet-500/20 rounded-md p-6 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 text-violet-500/10 rotate-12 pointer-events-none">
                <Wallet size={120} />
              </div>
              <p className="text-[10px] font-bold text-violet-400/80 uppercase tracking-[0.2em] mb-4">Ví thu nhập tháng này</p>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-light tracking-tighter text-slate-100">
                  {/* Hiệu ứng đếm số tiền */}
                  <AnimatedNumber value={12500000} format={true} />
                </span>
                <span className="text-[10px] font-bold text-violet-400 uppercase italic tracking-widest">VNĐ</span>
              </div>
              <div className="pt-4 border-t border-violet-500/10 flex justify-between items-center">
                <span className="text-[11px] text-slate-400">Đã tăng 15% so với tháng trước</span>
                <button className="text-[10px] font-black text-violet-400 flex items-center gap-1 uppercase tracking-widest hover:text-violet-300 transition-colors">
                  Rút tiền <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* 2. STATS GRID (Có Animation đếm số) */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-md">
                <div className="text-violet-500/50 mb-4"><Users size={18}/></div>
                <div className="text-3xl font-light text-slate-200 mb-1">
                  <AnimatedNumber value={24} duration={1} />
                </div>
                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Học viên active</div>
              </div>
              <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-md">
                <div className="text-violet-500/50 mb-4"><Star size={18} /></div>
                <div className="text-3xl font-light text-slate-200 mb-1">
                  <AnimatedNumber value={4.9} decimals={1} duration={1} />
                </div>
                <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Điểm đánh giá</div>
              </div>
              <div className="bg-white/[0.01] border border-white/[0.05] p-5 rounded-md col-span-2 flex justify-between items-center">
                 <div>
                    <div className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-1">Tổng giờ giảng</div>
                    <div className="text-2xl font-light text-slate-300">
                      <AnimatedNumber value={456} duration={3} /> <span className="text-sm text-slate-600">giờ</span>
                    </div>
                 </div>
                 <div className="p-3 bg-violet-500/10 rounded-full text-violet-400">
                    <Clock size={20} />
                 </div>
              </div>
            </motion.div>

            {/* 3. RECENT REVIEWS */}
            <motion.div variants={itemVariants} className="pt-2">
              <h3 className="font-bold text-slate-600 text-[10px] uppercase tracking-[0.2em] px-1 mb-4 flex items-center gap-2">
                <MessageSquare size={14} className="text-violet-500/40"/> Feedback mới nhất
              </h3>
              <div className="space-y-3">
                <div className="p-4 bg-white/[0.01] border border-white/[0.03] rounded-sm">
                  <div className="flex items-center gap-1 mb-2 text-violet-400">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                  <p className="text-[12px] text-slate-400 italic">"Thầy giảng phần đồ thị rất dễ hiểu. Lần đầu tiên em tự code được thuật toán Dijkstra!"</p>
                  <p className="text-[9px] text-slate-600 uppercase tracking-wider font-bold mt-3">— Học viên ẩn danh</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}