import { Star, Calendar, ShieldCheck, GraduationCap, BookOpen, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import avt from '../../../../assets/avt.jpg'; 

export default function TutorCard({ tutor }) {
  const subjects = tutor?.subjects || [];

  return (
    <div className="group relative flex flex-col md:flex-row bg-white/60 backdrop-blur-xl border border-white/60 rounded-[2rem] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgb(0,0,0,0.06)] transition-all duration-300 overflow-hidden gap-6">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-violet-100 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity pointer-events-none"></div>

      {/* CỘT 1: Avatar & Đánh giá */}
      <div className="flex flex-col items-center min-w-[140px] z-10">
        <div className="relative mb-3">
          <img 
            src={avt} 
            alt={tutor?.name} 
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-4 border-white shadow-sm" 
          />
          <div className="absolute -bottom-2 -right-2 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-slate-800 font-bold text-lg">
            <Star className="fill-yellow-400 text-yellow-400" size={18} />
            <span>{tutor?.rating || "N/A"}</span>
          </div>
          <span className="text-slate-500 text-xs font-medium">{tutor?.totalReviews || 0} đánh giá</span>
        </div>
      </div>

      {/* CỘT 2: Thông tin chi tiết */}
      <div className="flex-1 flex flex-col z-10">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 flex items-center gap-2">
            {tutor?.name}
            <ShieldCheck size={20} className="text-blue-500" />
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-600 text-sm font-medium mb-3">
          <span className="flex items-center gap-1.5">
            <GraduationCap size={16} className="text-violet-500"/> 
            {tutor?.department || "Chưa cập nhật khoa"}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
          <span className="flex items-center gap-1.5">
            <BookOpen size={16} className="text-orange-400"/> 
            {subjects.length} môn học
          </span>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
          {tutor?.bio || "Giảng viên này chưa cập nhật phần giới thiệu chi tiết."}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {subjects.slice(0, 4).map((sub, idx) => (
            <span 
              key={idx} 
              className="bg-blue-50/80 border border-blue-100 text-blue-700 text-[11px] font-bold px-3 py-1.5 rounded-lg"
            >
              {sub}
            </span>
          ))}
        </div>
      </div>

      {/* CỘT 3: Hành động */}
      <div className="flex flex-col md:items-end justify-center md:min-w-[180px] z-10 border-t md:border-t-0 md:border-l border-slate-100/50 pt-5 md:pt-0 md:pl-6 mt-4 md:mt-0 gap-3">
        <div className="flex flex-col md:items-end mb-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Chi phí</span>
          <span className="text-2xl font-black text-slate-800">Miễn phí</span>
        </div>

        <Link
          to={`/student/schedule/${tutor?.id}`}
          /* ĐÃ LOẠI BỎ: group-hover:scale-[1.02] */
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold px-5 py-3 rounded-xl text-sm shadow-[0_4px_14px_0_rgba(59,130,246,0.3)] flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <Calendar size={18} />
          Xem lịch trống
        </Link>
        
        <button className="w-full bg-white/80 hover:bg-white text-slate-700 border border-slate-200 font-bold px-5 py-2.5 rounded-xl text-sm shadow-sm transition-colors flex items-center justify-center gap-2">
          <MessageCircle size={18} className="text-slate-400" />
          Nhắn tin
        </button>
      </div>

    </div>
  );
}