import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, User, MapPin, Video, AlertCircle, FileText, 
  CheckCircle, Trash, MonitorUp, Paperclip, X, Edit, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useDeleteHistory } from '../hooks/useDeleteHistory';

export default function AppointmentRow({
  appointment,
  onCancel,
  onCancelBeforeAccept,
  onReschedule,
  onFeedback,
  onReport
}) {
  const { status, _id, type } = appointment;
  const isCompleted = status === "completed";
  const isCancelled = status === "cancelled" || status === "declined";

  const { mutate: handleDeleteHistory } = useDeleteHistory(_id);

  const [day, month] = appointment.date ? appointment.date.split('/') : ["--", "--"];

  const statusMap = {
    pending:   { label: "Đang chờ", color: "#d97706", bg: "bg-[#d97706]/10", border: "border-[#d97706]/20" },
    accepted:  { label: "Đã xác nhận", color: "#0d9488", bg: "bg-[#0d9488]/10", border: "border-[#0d9488]/20" },
    completed: { label: "Hoàn thành", color: "#0088cc", bg: "bg-[#6366f1]/10", border: "border-[#6366f1]/20" },
    cancelled: { label: "Đã hủy", color: "#e11d48", bg: "bg-[#e11d48]/10", border: "border-[#e11d48]/20" },
    declined:  { label: "Từ chối", color: "#64748b", bg: "bg-slate-500/10", border: "border-slate-500/20" }
  };
  const theme = statusMap[status] || statusMap.pending;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-[#0f172a] border border-white/5 rounded-sm mb-4 group overflow-hidden shadow-xl"
    >
      {/* DECOR: HÌNH ẢNH CÁCH ĐIỆU GÓC PHẢI (Abstract Tech Art) */}
      <div className="absolute top-0 right-0 h-full w-1/2 opacity-10 pointer-events-none transition-opacity">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M100 0 L100 100 L0 100 C 40 100 60 0 100 0" fill={theme.color} fillOpacity="0.2" />
          <path d="M100 20 L80 0 M100 50 L50 100 M100 80 L80 100" stroke="white" strokeWidth="0.5" />
          <circle cx="90" cy="10" r="1.5" fill="white" />
          <circle cx="60" cy="80" r="1" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row">
        
        {/* KHỐI NGÀY THÁNG */}
        <div className="flex flex-row md:flex-col items-center justify-center p-6 bg-black/20 border-b md:border-b-0 md:border-r border-white/5 min-w-[100px]">
          <span className="text-3xl font-black text-white leading-none tracking-tighter">{day}</span>
          <span className="text-[10px] font-bold text-slate-400 uppercase mt-1 md:mt-2 tracking-widest">TH.{month}</span>
        </div>

        {/* NỘI DUNG CHÍNH */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <h3 className="text-sm font-black text-slate-100 uppercase tracking-widest truncate max-w-[350px]">
              {appointment.subject || appointment.title || "Buổi học chuyên môn"}
            </h3>
            <span 
              className={`text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-tighter`}
              style={{ color: theme.color }}
            >
              {theme.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-300">
              <User size={14} className="text-blue-500" />
              <span className="uppercase tracking-tight">{appointment.tutorName || "Người hướng dẫn"}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <Clock size={14} />
              <span>{appointment.time || "--:--"}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold">
              {type === "online" ? (
                <span className="text-emerald-500 flex items-center gap-1.5"><Video size={14}/> TRỰC TUYẾN</span>
              ) : (
                <span className="text-orange-500 flex items-center gap-1.5"><MapPin size={14}/> {appointment.location}</span>
              )}
            </div>
          </div>

          {/* Tools & Lý do */}
          <div className="mt-5 flex items-center gap-4">
            <button className="text-[9px] font-black text-slate-500 hover:text-white flex items-center gap-1.5 transition-colors uppercase">
              <MonitorUp size={12}/> Bảng trắng
            </button>
            <button className="text-[9px] font-black text-slate-500 hover:text-white flex items-center gap-1.5 transition-colors uppercase">
              <Paperclip size={12}/> Tài liệu
            </button>
            {isCancelled && appointment.reason && (
              <span className="ml-auto text-[10px] text-red-500/80 italic font-medium">
                // Lý do: {appointment.reason}
              </span>
            )}
          </div>
        </div>

        {/* KHỐI HÀNH ĐỘNG */}
        <div className="p-6 flex items-center justify-end bg-black/10 md:bg-transparent min-w-[200px]">
          
          {/* Trạng thái Đã xác nhận */}
          {status === "accepted" && (
            <div className="flex gap-2 items-center">
              <button onClick={() => onCancel(appointment)} className="px-4 py-2 text-[10px] font-black text-red-600 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-sm transition-all uppercase">
                Hủy lịch
              </button>
              {type === "online" && (
                <a href={appointment.link || "#"} target="_blank" rel="noreferrer" 
                   className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
                  <Zap size={14} fill="currentColor" /> Vào học
                </a>
              )}
            </div>
          )}

          {/* Trạng thái Chờ duyệt */}
          {status === "pending" && (
            <div className="flex gap-2">
              <button onClick={() => onReschedule(appointment)} className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 rounded-sm border border-white/5">
                <Edit size={16} />
              </button>
              <button onClick={() => onCancelBeforeAccept(appointment)} className="px-4 py-2.5 text-[10px] font-black text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white rounded-sm transition-all uppercase">
                Hủy yêu cầu
              </button>
            </div>
          )}

          {/* Trạng thái Hoàn thành */}
          {status === "completed" && (
            <div className="flex gap-2 items-center">
              <button onClick={() => onReport(appointment)} className="p-2.5 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 transition-all">
                <FileText size={20} />
              </button>
              {appointment.rating ? (
                <div className="px-4 py-2 border border-emerald-500/30 text-emerald-500 text-[10px] font-black tracking-widest uppercase">
                  Đã đánh giá: {appointment.rating}
                </div>
              ) : (
                <button onClick={() => onFeedback(appointment)} className="px-6 py-2.5 bg-amber-500 text-amber-950 text-[10px] font-black uppercase rounded-sm hover:bg-amber-400 transition-all">
                  Đánh giá
                </button>
              )}
            </div>
          )}

          {/* Trạng thái Đã hủy / Từ chối */}
          {isCancelled && (
            <div className="flex gap-3 items-center">
              <button onClick={() => handleDeleteHistory()} className="p-2.5 text-slate-500 hover:text-red-500 transition-colors">
                <Trash size={18} />
              </button>
              <Link to="/student/tutors" className="px-5 py-2.5 border border-white/10 text-slate-300 text-[10px] font-black uppercase rounded-sm hover:bg-white/5">
                Đặt lịch lại
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}