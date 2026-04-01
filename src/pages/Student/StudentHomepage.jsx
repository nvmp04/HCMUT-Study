import React from 'react';
import { Calendar, Clock, Zap, Bell, Flame, ChevronRight, Video, Target } from "lucide-react";
// Import hook logic nghiệp vụ của bạn
import { useProfile } from "../../features/profile/hooks/useProfile";
import { LoadingModal } from '../../components/LoadingModal';

// --- MOCK DATA TĨNH (Sử dụng để render UI khi chưa có data từ API) ---
const MOCK_DATA = {
  nextClass: {
    tutor: "TS. Nguyễn Văn A",
    subject: "Tư duy Thiết kế & Giải quyết vấn đề",
    time: "14:00 - 16:00",
    date: "Hôm nay",
    countdown: "2h 15m",
  },
  stats: {
    hours: 124,
    streak: 15,
    completed: 42
  },
  aiRoadmap: [
    { id: 1, title: "Kỹ năng phân tích nguyên nhân gốc rễ", type: "Thực hành nhóm", status: "current" },
    { id: 2, title: "Lập kế hoạch dự án Agile", type: "Lý thuyết & Trắc nghiệm", status: "locked" },
  ],
  activities: [
    { id: 1, text: "Gia sư B đã phê duyệt lịch hẹn ngày mai.", time: "2 giờ trước" },
    { id: 2, text: "AI đã cập nhật lộ trình học mới cho bạn.", time: "5 giờ trước" },
  ]
};

export default function StudentHomepage() {
  const { data, isLoading } = useProfile();

  if (isLoading) return <LoadingModal />;

  // Logic lấy tên sinh viên
  const studentName = data?.student?.name?.split(' ').pop() || "Bạn";

  return (
    /** * TRANG CHỦ SINH VIÊN
     * Đã loại bỏ bg-slate-50 để hiện MeshGradient ở cấp ngoài cùng (App.jsx)
     */
    <div className="min-h-screen bg-transparent text-slate-800 p-4 md:p-8 md:pl-28 relative font-sans">
      
      {/* Content Container (z-10 để đảm bảo nằm trên tấm nền) */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full flex flex-col gap-8 pt-4 md:pt-8">
        
        {/* SECTION: HEADER & WELCOME */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-2">
              Chào buổi sáng, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">{studentName}!</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base font-medium">
              Bạn đã sẵn sàng cho những khám phá mới ngày hôm nay chưa?
            </p>
          </div>
          <button className="flex items-center gap-2 bg-white/60 hover:bg-white text-slate-700 border border-white/50 shadow-sm backdrop-blur-md rounded-xl px-4 py-2 transition-all font-medium text-sm">
            <Calendar size={16} className="text-blue-500" />
            Xem toàn bộ lịch
          </button>
        </div>

        {/* BENTO GRID SYSTEM */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-slate-800">
          
          {/* WIDGET 1: LỚP HỌC TIẾP THEO (HERO) */}
          <div className="md:col-span-8 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] transition-all">
            {/* Hiệu ứng trang trí chìm */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-blue-100 to-violet-100 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-all"></div>
            
            <div className="relative z-10 flex justify-between items-start mb-10">
              <div className="bg-blue-50 border border-blue-100 text-blue-600 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1.5 uppercase tracking-widest shadow-sm">
                <Clock size={14} /> Sắp diễn ra trong {MOCK_DATA.nextClass.countdown}
              </div>
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                {MOCK_DATA.nextClass.subject}
              </h2>
              <div className="flex flex-wrap items-center gap-5 text-slate-600 text-sm md:text-base mb-10 font-medium">
                <span className="flex items-center gap-2"><Target size={18} className="text-violet-500"/> {MOCK_DATA.nextClass.tutor}</span>
                <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-2"><Calendar size={18} className="text-orange-400"/> {MOCK_DATA.nextClass.time}</span>
              </div>
              
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl px-8 py-4 transition-all shadow-md hover:shadow-xl flex items-center gap-3 w-full md:w-auto justify-center">
                <Video size={20} className="text-blue-300" />
                Vào phòng học ngay
              </button>
            </div>
          </div>

          {/* WIDGET 2: THỐNG KÊ (STATS) */}
          <div className="md:col-span-4 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-7 flex flex-col gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">Tiến độ học tập</h3>
            
            <div className="bg-gradient-to-br from-orange-50/50 to-amber-50/50 rounded-2xl p-5 flex items-center gap-4 border border-orange-100/50">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <Flame size={24} className="text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-800">{MOCK_DATA.stats.streak} Ngày</div>
                <div className="text-xs font-bold text-orange-600/70">Chuỗi học liên tục</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="bg-blue-50/40 rounded-2xl p-5 flex flex-col justify-center border border-blue-100/50">
                <div className="text-2xl font-black text-blue-600 mb-1">{MOCK_DATA.stats.hours}h</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Giờ học</div>
              </div>
              <div className="bg-violet-50/40 rounded-2xl p-5 flex flex-col justify-center border border-violet-100/50">
                <div className="text-2xl font-black text-violet-600 mb-1">{MOCK_DATA.stats.completed}</div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">Hoàn thành</div>
              </div>
            </div>
          </div>

          {/* WIDGET 3: LỘ TRÌNH AI (AI ROADMAP) */}
          <div className="md:col-span-7 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-slate-800 font-bold text-lg flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-xl text-yellow-600 shadow-sm">
                  <Zap size={20} fill="currentColor" />
                </div>
                Lộ trình AI đề xuất
              </h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-bold flex items-center gap-1 group">
                Chi tiết <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {MOCK_DATA.aiRoadmap.map((item, idx) => (
                <div key={item.id} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${item.status === 'current' ? 'bg-white border-blue-200 shadow-sm' : 'bg-slate-50/30 border-transparent opacity-60'}`}>
                  <div className="flex items-center gap-5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${item.status === 'current' ? 'bg-blue-600 text-white shadow-blue-200 shadow-lg' : 'bg-slate-200 text-slate-500'}`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className={`font-bold ${item.status === 'current' ? 'text-slate-800' : 'text-slate-500'}`}>{item.title}</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{item.type}</div>
                    </div>
                  </div>
                  {item.status === 'current' && (
                    <button className="px-5 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-xs rounded-xl transition-colors">
                      TIẾP TỤC
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* WIDGET 4: HOẠT ĐỘNG GẦN ĐÂY */}
          <div className="md:col-span-5 bg-white/70 backdrop-blur-xl border border-white/80 rounded-3xl p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
                <Bell size={20} />
              </div>
              <h3 className="text-slate-800 font-bold text-lg">Hoạt động gần đây</h3>
            </div>
            
            <div className="flex flex-col gap-0 relative">
              {/* Timeline Line */}
              <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-100"></div>
              
              {MOCK_DATA.activities.map((act) => (
                <div key={act.id} className="flex gap-5 p-4 relative z-10 group">
                  <div className="w-10 h-10 rounded-full bg-white border-4 border-slate-50 shadow-sm flex-shrink-0 mt-0 z-10 flex items-center justify-center group-hover:scale-110 transition-transform font-bold text-[10px] text-slate-300">
                    ●
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700 leading-relaxed mb-1">{act.text}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}