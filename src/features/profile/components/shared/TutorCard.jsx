import { Link } from "react-router-dom";
import { Star, CheckCircle, MessageSquare, Calendar, GraduationCap } from "lucide-react";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function TutorCard({ tutor }) {
  return (
    <div className="group flex flex-col md:flex-row w-full bg-[#161e2e]/30 border border-white/[0.05] rounded-lg overflow-hidden hover:border-white/20 transition-all duration-200">
      
      {/* Avatar vuông vức hơn, bớt màu mè */}
      <div className="p-6 md:w-[140px] flex-shrink-0 flex md:flex-col items-center gap-4">
        <div className="w-20 h-20 bg-slate-800 rounded-md overflow-hidden border border-white/10">
          {tutor?.avatarUrl ? (
            <img src={tutor.avatarUrl} alt="" className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold">{getInitials(tutor?.name)}</div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Star size={12} className="text-emerald-500 fill-emerald-500" />
          <span className="text-sm font-semibold text-white">{tutor?.rating || "5.0"}</span>
        </div>
      </div>

      {/* Thông tin: Text phẳng, phân cấp bằng độ đậm nhạt của chữ */}
      <div className="flex-1 p-6 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/[0.05]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Verified</span>
          <span className="text-[9px] font-medium text-slate-600 uppercase tracking-widest">{tutor?.department}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-200 mb-2">{tutor?.name}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4 max-w-2xl">
          {tutor?.bio || "Thông tin giới thiệu về kỹ năng và kinh nghiệm giảng dạy."}
        </p>
        <div className="flex flex-wrap gap-2">
          {tutor?.subjects?.slice(0, 3).map((sub, i) => (
            <span key={i} className="text-[10px] text-slate-400 bg-white/5 px-2 py-1 rounded-sm border border-white/5">{sub}</span>
          ))}
        </div>
      </div>

      {/* Action: Chỉ giữ 1 nút Emerald nổi bật, còn lại làm chìm */}
      <div className="p-6 md:w-[180px] flex md:flex-col justify-between items-center md:justify-center gap-4 bg-black/10">
        <div className="text-center">
          <span className="block text-[10px] text-slate-600 uppercase">Học phí</span>
          <span className="text-lg font-bold text-white tracking-tight">Miễn phí</span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Link to={`/student/schedule/${tutor?.id}`} className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold uppercase text-center rounded-sm transition-colors">
            Xem lịch dạy
          </Link>
          <button className="w-full py-2 border border-white/10 text-slate-400 hover:text-white text-[11px] font-bold uppercase text-center rounded-sm transition-colors">
            Gửi tin nhắn
          </button>
        </div>
      </div>
    </div>
  );
}