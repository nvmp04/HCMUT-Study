import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Zap, Bell, ArrowUpRight, Video, 
  BarChart3, ChevronRight, FileText, Play, Target, 
  MoreHorizontal, BookOpen, Award
} from "lucide-react";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { LoadingModal } from '../../components/LoadingModal';
import { motion } from 'framer-motion';

export default function StudentHomepage() {
  const { data, isLoading } = useProfile();
  const [timeLeft, setTimeLeft] = useState(1500); // 25:00
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  if (isLoading) return <LoadingModal />;

  const studentName = data?.student?.name?.split(' ').pop() || "Bạn";
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Cấu hình animation cho container cha và các phần tử con
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Hiệu ứng xuất hiện lần lượt
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-400 p-6 md:pl-28 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* Background Glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" 
      />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-[1300px] px-2 py-16 mx-auto"
      >

        <div className="grid grid-cols-12 gap-8">
          
          {/* --- LEFT COLUMN (MAIN CONTENT) --- */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            
            {/* 1. DEEP WORK TIMER */}
            <motion.div variants={itemVariants} className="bg-emerald-500/[0.02] border border-emerald-500/10 rounded-md p-6 flex flex-col sm:flex-row items-center justify-between group">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="p-3 bg-emerald-500/5 rounded-full text-emerald-600">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Chế độ tập trung</h4>
                  <p className="text-[9px] text-slate-600 uppercase tracking-widest mt-0.5 font-bold">Deep Work Session (Pomodoro)</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="text-3xl font-mono text-slate-300 tracking-tighter">{formatTime(timeLeft)}</span>
                <button 
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-6 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all ${
                    isTimerRunning ? 'bg-slate-800 text-slate-400' : 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40'
                  }`}
                >
                  {isTimerRunning ? 'Tạm dừng' : 'Bắt đầu'}
                </button>
              </div>
            </motion.div>

            {/* 2. NEXT CLASS HERO */}
            <motion.div variants={itemVariants} className="bg-[#1e293b]/20 border border-white/[0.05] rounded-md overflow-hidden backdrop-blur-sm">
              <div className="px-6 py-3 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.01]">
                <span className="text-[9px] font-black text-emerald-500/70 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Lớp học tiếp theo
                </span>
                <button className="text-slate-600 hover:text-slate-400"><MoreHorizontal size={14}/></button>
              </div>
              <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between gap-10">
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-slate-200 tracking-tight mb-6">
                      Tư duy Thiết kế & Giải quyết vấn đề
                    </h2>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-1">
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Gia sư</span>
                          <p className="text-sm font-medium text-slate-400">TS. Nguyễn Văn A</p>
                       </div>
                       <div className="space-y-1">
                          <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">Thời gian</span>
                          <p className="text-sm font-medium text-slate-400">14:00 - Chiều nay</p>
                       </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="w-full md:w-auto px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white transition-all rounded-sm flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20">
                      <Video size={16} /> Vào lớp ngay
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. RECENT RESOURCES */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                <BookOpen size={14}/> Tài liệu truy cập nhanh
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: "Slide: Hệ quản trị CSDL nâng cao", time: "Hôm qua", icon: <FileText size={16}/> },
                  { title: "Record: Chữa bài tập Lab 3", time: "2 ngày trước", icon: <Play size={16}/> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.01] border border-white/[0.03] rounded-sm hover:border-emerald-500/20 cursor-pointer transition-all group">
                    <div className="p-2 bg-slate-800 text-slate-500 group-hover:text-emerald-500 transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-slate-400 truncate font-medium group-hover:text-slate-200 transition-colors">{item.title}</p>
                      <p className="text-[9px] text-slate-600 mt-1 uppercase font-bold tracking-tighter">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. AI ROADMAP */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <h3 className="font-bold text-slate-600 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap size={14} className="text-emerald-500/40" /> Lộ trình cá nhân hóa
                </h3>
              </div>
              <div className="grid gap-2">
                {[
                  { title: "Kỹ năng phân tích nguyên nhân gốc rễ", type: "Thực hành", active: true },
                  { title: "Lập kế hoạch dự án Agile", type: "Lý thuyết", active: false }
                ].map((item, idx) => (
                  <div key={idx} className={`group flex items-center justify-between p-5 border rounded-sm transition-all ${item.active ? 'border-emerald-500/10 bg-emerald-500/[0.01]' : 'border-white/[0.02] opacity-40'}`}>
                    <div className="flex items-center gap-6">
                      <span className={`text-[10px] font-mono ${item.active ? 'text-emerald-600' : 'text-slate-800'}`}>0{idx + 1}</span>
                      <div>
                        <div className={`text-sm ${item.active ? 'text-slate-300' : 'text-slate-600'}`}>{item.title}</div>
                        <div className="text-[9px] font-bold text-slate-700 uppercase tracking-widest mt-1">{item.type}</div>
                      </div>
                    </div>
                    {item.active && <ChevronRight size={14} className="text-slate-800 group-hover:text-emerald-500 transition-colors" />}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN (STATS & ACTIVITY) --- */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            
            {/* 1. WEEKLY PROGRESS */}
            <motion.div variants={itemVariants} className="bg-[#1e293b]/10 border border-white/[0.05] rounded-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <Target size={14}/> Mục tiêu tuần
                </h3>
                <span className="text-[10px] text-emerald-500/70 font-mono font-bold">75%</span>
              </div>
              <div className="space-y-4">
                <div className="w-full bg-white/[0.02] h-[3px] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-emerald-600/50 h-full" 
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                  <span className="text-slate-500">3/4 Buổi học</span>
                  <button className="text-slate-600 hover:text-emerald-500 transition-colors underline decoration-white/5">Chi tiết</button>
                </div>
              </div>
            </motion.div>

            {/* 2. STATS OVERVIEW */}
            <motion.div variants={itemVariants} className="bg-white/[0.01] border border-white/[0.05] rounded-md p-6">
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-4">Học liên tục</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-light tracking-tighter text-slate-200">15</span>
                <span className="text-[10px] font-bold text-emerald-600/60 uppercase italic tracking-widest">Ngày</span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/[0.03] flex justify-between">
                 <div className="text-center">
                    <p className="text-lg font-medium text-slate-400">124</p>
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">Tổng giờ</p>
                 </div>
                 <div className="text-center">
                    <p className="text-lg font-medium text-slate-400">42</p>
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">Bài học</p>
                 </div>
                 <div className="text-center">
                    <p className="text-lg font-medium text-slate-400">08</p>
                    <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">Chứng chỉ</p>
                 </div>
              </div>
            </motion.div>

            {/* 3. QUICK MATCH */}
            <motion.div variants={itemVariants} className="space-y-4 pt-2">
              <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                <Award size={14}/> Gia sư gợi ý
              </h3>
              <div className="grid gap-3">
                {[
                  { name: "Lê Minh Anh", skill: "Algorithm Expert", rate: "5.0" },
                  { name: "Trần Thế Vinh", skill: "System Architect", rate: "4.9" }
                ].map((t, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.03] rounded-sm group hover:border-emerald-500/20 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-800 rounded-sm flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-bold text-slate-300 truncate">{t.name}</p>
                        <p className="text-[9px] text-slate-600 truncate">{t.skill}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-700 group-hover:text-emerald-500 transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 4. ACTIVITY LOG */}
            <motion.div variants={itemVariants} className="pt-4 px-1">
              <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <Bell size={14} /> Hoạt động mới
              </h3>
              <div className="space-y-8 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/[0.05]">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-emerald-600/40 ring-4 ring-[#0f172a]"></div>
                  <p className="text-[11px] text-slate-400">Gia sư B phê duyệt lịch học buổi tới</p>
                  <p className="text-[8px] text-slate-700 mt-1 uppercase font-bold tracking-widest">2 giờ trước</p>
                </div>
                <div className="relative pl-8 opacity-40">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-slate-800 ring-4 ring-[#0f172a]"></div>
                  <p className="text-[11px] text-slate-500 italic">Hệ thống đã tự động cập nhật AI Roadmap</p>
                  <p className="text-[8px] text-slate-700 mt-1 uppercase font-bold tracking-widest">5 giờ trước</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}