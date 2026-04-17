import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, Zap, Bell, ArrowUpRight, Video, 
  ChevronRight, FileText, Play, Target, 
  MoreHorizontal, BookOpen, Award
} from "lucide-react";
import { useProfile } from "../../features/profile/hooks/useProfile";
import { useQuery } from '@tanstack/react-query';
import { fetchAPI } from '../../utils/fetchAPI';
import { API_ENDPOINTS, buildAPIUrl } from '../../config/api.config'
import { LoadingModal } from '../../components/LoadingModal';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function StudentHomepage() {
  const { data: profileData, isLoading: isProfileLoading } = useProfile();
  const { data: roadmapData, isLoading: isRoadmapLoading } = useQuery({
    queryKey: ['roadmap'],
    queryFn: async () => fetchAPI(buildAPIUrl(API_ENDPOINTS.ROADMAP.GET_ROADMAP), 'GET', null, true)
  });
  const { data: tutorData, isLoading: isTutorsLoading } = useQuery({
    queryKey: ["suitabletutors", roadmapData?.roadmap?.tutors],
    queryFn: async () => await fetchAPI(buildAPIUrl(API_ENDPOINTS.ROADMAP.SUITABLE_TUTORS), "POST", { tutorsId: roadmapData?.roadmap?.tutors }, true),
    enabled: !!roadmapData?.roadmap?.tutors 
  });

  const [timeLeft, setTimeLeft] = useState(1500);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  if (isProfileLoading || isRoadmapLoading) return <LoadingModal />;

  const studentName = profileData?.student?.name?.split(' ').pop() || "Bạn";
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-400 p-6 md:pl-28 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
      
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 max-w-[1300px] px-2 py-16 mx-auto">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 space-y-8">
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
                    <h2 className="text-2xl font-semibold text-slate-200 tracking-tight mb-6">Tư duy Thiết kế & Giải quyết vấn đề</h2>
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
                    <div className="p-2 bg-slate-800 text-slate-500 group-hover:text-emerald-500 transition-colors">{item.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-slate-400 truncate font-medium group-hover:text-slate-200 transition-colors">{item.title}</p>
                      <p className="text-[9px] text-slate-600 mt-1 uppercase font-bold tracking-tighter">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <h3 className="font-bold text-slate-600 text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
                  <Zap size={14} className="text-emerald-500/40" /> Lộ trình cá nhân hóa
                </h3>
              </div>
              <div className="grid gap-2">
                {roadmapData?.roadmap?.stages?.map((stage, idx) => (
                  <div key={stage.id} className="group flex items-center justify-between p-5 border border-emerald-500/10 bg-emerald-500/[0.01] rounded-sm transition-all hover:bg-emerald-500/[0.03]">
                    <div className="flex items-center gap-6">
                      <span className="text-[10px] font-mono text-emerald-600">0{idx + 1}</span>
                      <div>
                        <div className="text-sm text-slate-300 font-medium">{stage.name}</div>
                        <div className="text-[9px] font-bold text-slate-700 uppercase tracking-widest mt-1">{stage.duration}</div>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-800 group-hover:text-emerald-500 transition-colors" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* --- RIGHT COLUMN --- */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* 1. WEEKLY PROGRESS - KHÔI PHỤC */}
            <motion.div variants={itemVariants} className="bg-[#1e293b]/10 border border-white/[0.05] rounded-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2"><Target size={14}/> Mục tiêu tuần</h3>
                <span className="text-[10px] text-emerald-500/70 font-mono font-bold">75%</span>
              </div>
              <div className="space-y-4">
                <div className="w-full bg-white/[0.02] h-[3px] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1, delay: 0.5 }} className="bg-emerald-600/50 h-full" />
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                  <span className="text-slate-500">3/4 Buổi học</span>
                  <button className="text-slate-600 hover:text-emerald-500 transition-colors underline decoration-white/5">Chi tiết</button>
                </div>
              </div>
            </motion.div>

            {/* 2. STATS OVERVIEW - KHÔI PHỤC */}
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
            <motion.div variants={itemVariants} className="space-y-4 pt-2">
              <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                <Award size={14}/> Gia sư gợi ý
              </h3>
              <div className="grid gap-3">
                {isTutorsLoading ? (
                  <div className="animate-pulse space-y-2">
                    <div className="h-14 bg-white/5 rounded-sm" />
                    <div className="h-14 bg-white/5 rounded-sm" />
                  </div>
                ) : tutorData?.tutors?.slice(0, 3).map((t) => (
                  <Link 
                    key={t.id} 
                    to={`/student/schedule/${t.id}`}
                    className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/[0.03] rounded-sm group hover:border-emerald-500/20 transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Avatar chuẩn theo TutorCard: tutor.avatarUrl */}
                      <div className="w-9 h-9 bg-slate-800 rounded-sm flex-shrink-0 overflow-hidden border border-white/10">
                        {t.avatarUrl ? (
                          <img src={t.avatarUrl} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-slate-500">
                            {t.name?.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("")}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        {/* Tên chuẩn: t.name */}
                        <p className="text-[11px] font-bold text-slate-300 truncate group-hover:text-emerald-400 transition-colors">
                          {t.name}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-[9px] text-slate-600 truncate uppercase tracking-tighter font-bold">
                            {t.department || "N/A"}
                          </p>
                          <div className="flex items-center gap-0.5 border-l border-white/10 pl-2">
                          </div>
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-700 group-hover:text-emerald-500 transition-all" />
                  </Link>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-4 px-1">
              <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                <Bell size={14} /> Hoạt động mới
              </h3>
              <div className="space-y-8 relative before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/[0.05]">
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-1.5 h-1.5 rounded-full bg-emerald-600/40 ring-4 ring-[#0f172a]"></div>
                  <p className="text-[11px] text-slate-400">Gia sư phê duyệt lịch học mới</p>
                  <p className="text-[8px] text-slate-700 mt-1 uppercase font-bold tracking-widest">2 giờ trước</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}