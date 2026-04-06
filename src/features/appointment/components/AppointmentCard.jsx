import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, User, MapPin, Video, AlertCircle, FileText, 
  CheckCircle, XCircle, Edit, Star, Trash, MonitorUp, Paperclip, X
} from 'lucide-react';

// Giả định hook này tồn tại trong project của bạn
import { useDeleteHistory } from '../hooks/useDeleteHistory';

export default function AppointmentRow({
  appointment,
  onCancel,
  onCancelBeforeAccept,
  onReschedule,
  onFeedback,
  onReport
}) {
  const { status, _id } = appointment;
  const isCompleted = status === "completed";
  const isCancelled = status === "cancelled";

  const { mutate: handleDeleteHistory } = useDeleteHistory(_id);

  // Parse ngày tháng cho Date Block bên trái
  const dateObj = appointment.date
    ? new Date(appointment.date)
    : appointment.startTime
    ? new Date(appointment.startTime)
    : null;

  const dayNum = dateObj ? dateObj.getDate().toString().padStart(2, "0") : "--";
  const monthStr = dateObj
    ? ["Th1", "Th2", "Th3", "Th4", "Th5", "Th6", "Th7", "Th8", "Th9", "Th10", "Th11", "Th12"][dateObj.getMonth()]
    : "---";

  // Cấu hình màu sắc cho trạng thái
  const statusMap = {
    pending:   { label: "Đang chờ",     bg: "#FAEEDA", color: "#854F0B", border: "border-amber-200" },
    accepted:  { label: "Đã xác nhận",  bg: "#EAF3DE", color: "#3B6D11", border: "border-green-200" },
    completed: { label: "Hoàn thành",   bg: "#E6F1FB", color: "#185FA5", border: "border-blue-200" },
    cancelled: { label: "Đã hủy",       bg: "#FCEBEB", color: "#A32D2D", border: "border-red-200" },
  };
  const pill = statusMap[status] || { label: status, bg: "#eee", color: "#555", border: "border-gray-200" };

  return (
    <div className={`bg-white rounded-2xl border ${pill.border} shadow-sm hover:shadow-md transition-all duration-200 mb-4 overflow-hidden ${isCancelled ? "opacity-80 bg-slate-50" : ""}`}>
      
      {/* ─── PHẦN THÂN CARD (THÔNG TIN & DATE BLOCK) ─── */}
      <div className="p-5 flex flex-col sm:flex-row gap-5">
        
        {/* Date block (Giao diện mới) */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-xl border border-slate-200">
          <span className="text-2xl sm:text-3xl font-black text-slate-800 leading-none mb-1">{dayNum}</span>
          <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest">{monthStr}</span>
        </div>

        {/* Thông tin chính */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="text-lg font-bold text-slate-900 truncate">
                {appointment.subject || appointment.title || "Buổi học chuyên môn"}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                <User size={15} className="text-blue-500" />
                <span className="font-medium">{appointment.tutorName || "Đang cập nhật"}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex-shrink-0">
              <span className="inline-flex items-center px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wide" style={{ background: pill.bg, color: pill.color }}>
                {pill.label}
              </span>
            </div>
          </div>

          {/* Chi tiết thời gian, địa điểm */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
            <div className="flex items-center gap-1.5">
              <Clock size={15} className="text-blue-500" />
              <span className="font-medium">{appointment.time || "--:--"}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              {appointment.type === "online" ? (
                <><Video size={15} className="text-emerald-500" /><span className="font-medium">Học Online</span></>
              ) : (
                <><MapPin size={15} className="text-orange-500" /><span className="font-medium">{appointment.location}</span></>
              )}
            </div>
          </div>

          {/* ─── KHAY TIỆN ÍCH MỞ RỘNG (SUPER CARD FEATURES) ─── */}
          {(status === "accepted" || status === "completed") && (
            <div className="flex flex-wrap gap-2 mt-3">
              {/* Nút vào phòng học (Nổi bật nhất nếu là online) */}
              {appointment.type === "online" && status === "accepted" && (
                <a href={appointment.link || "#"} target="_blank" rel="noreferrer" 
                   className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-bold transition-colors border border-teal-200">
                  <Video size={14} /> Vào phòng (Join Room)
                </a>
              )}
              
              {/* Tính năng tĩnh tương lai */}
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-xs font-bold transition-colors border border-indigo-100">
                <MonitorUp size={14} /> Bảng trắng chung
              </button>
              
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold transition-colors border border-slate-200">
                <Paperclip size={14} /> 2 Tài liệu đính kèm
              </button>
            </div>
          )}

          {/* Thông báo lý do hủy */}
          {isCancelled && appointment.reason && (
            <div className="mt-3 p-3 bg-red-50 rounded-xl text-sm text-red-700 border border-red-100 flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <div><strong className="font-semibold">Lý do hủy: </strong>{appointment.reason}</div>
            </div>
          )}
        </div>
      </div>

      {/* ─── PHẦN FOOTER (ACTION BUTTONS - CÓ CHỮ RÕ RÀNG) ─── */}
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        
        {/* Nút Report bên trái cho lịch đã hoàn thành */}
        <div className="flex-1">
          {isCompleted && (
            <button onClick={() => onReport(appointment)} className="inline-flex items-center gap-1.5 text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors">
              <FileText size={15} /> Xem biên bản / Báo cáo
            </button>
          )}
        </div>

        {/* Các nút hành động chính bên phải */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Nút cho Pending */}
          {status === "pending" && (
            <>
              <button onClick={() => onReschedule(appointment)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors">
                <Edit size={15} /> Đổi lịch
              </button>
              <button onClick={() => onCancelBeforeAccept(appointment)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 border border-red-100 transition-colors">
                <X size={15} /> Hủy lịch
              </button>
            </>
          )}

          {/* Nút cho Accepted */}
          {status === "accepted" && (
            <button onClick={() => onCancel(appointment)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 border border-red-100 transition-colors">
              <XCircle size={15} /> Hủy lịch
            </button>
          )}

          {/* Nút cho Completed */}
          {status === "completed" && (
            <>
              {appointment.rating && appointment.rating !== 0 ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold">
                  <CheckCircle size={15} /> Đã đánh giá ({appointment.rating}/5 <Star size={13} className="fill-emerald-500 text-emerald-500 mb-0.5"/>)
                </div>
              ) : (
                <button onClick={() => onFeedback(appointment)} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 text-amber-950 text-sm font-bold hover:bg-amber-500 shadow-sm transition-colors">
                  <Star size={15} /> Đánh giá buổi học
                </button>
              )}
            </>
          )}

          {/* Nút cho Cancelled */}
          {status === "cancelled" && (
            <>
              <button onClick={() => handleDeleteHistory()} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-500 text-sm font-semibold hover:text-red-600 hover:border-red-200 transition-colors">
                <Trash size={15} /> Xóa lịch
              </button>
              <Link to="/student/schedule" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 shadow-sm transition-colors">
                <Calendar size={15} /> Đặt lại lịch mới
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}