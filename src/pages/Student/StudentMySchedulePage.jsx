import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LoadingModal } from "../../components/LoadingModal";
import AppointmentCard from "../../features/appointment/components/AppointmentCard";
import CancelModal from "../../components/CancelModal";
import CancelBeforeAcceptModal from "../../features/appointment/components/CancelBeforeAcceptModal";
import RescheduleModal from "../../features/appointment/components/RescheduleModal";
import FeedbackModal from "../../features/feedback/components/FeedbackModal";
import ReportModal from "../../components/ReportModal";
import { useAppointments } from "../../features/appointment/hooks/useAppointments";
import {
  Clock,
  XCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Target,
  TrendingUp,
  AlertCircle
} from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

// --- Performance Overview ---
function PerformanceOverview({ completed, cancelled, upcoming }) {
  const totalPast = completed.length + cancelled.length;
  const completionRate = totalPast === 0 ? 0 : Math.round((completed.length / totalPast) * 100);
  const totalHours = (completed.length * 1.5).toFixed(1);

  let statusText = "Đang duy trì tốt";
  let statusColor = "text-emerald-500/80";
  let barColor = "bg-emerald-500/50";
  if (completionRate < 50 && totalPast > 0) {
    statusText = "Cần cải thiện";
    statusColor = "text-amber-500/80";
    barColor = "bg-amber-500/50";
  }

  return (
    <motion.div variants={itemVariants} className="bg-[#1e293b]/20 border border-white/[0.05] rounded-md p-6 mb-8 backdrop-blur-sm flex flex-col md:flex-row items-center gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
      
      {/* Tỷ lệ hoàn thành */}
      <div className="flex-1 w-full pt-4 md:pt-0 px-2">
        <div className="flex items-center gap-2 mb-4">
          <Target size={14} className="text-blue-500/60" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Tỷ lệ hoàn thành</span>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <span className="text-4xl font-mono text-slate-200 leading-none">{completionRate}%</span>
        </div>
        <div className="w-full bg-white/[0.02] h-[3px] rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${barColor}`} style={{ width: `${completionRate}%` }} />
        </div>
      </div>

      {/* Giờ học tích lũy */}
      <div className="flex-1 w-full pt-6 md:pt-0 px-2 md:pl-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} className="text-emerald-500/60" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Giờ học tích lũy</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-mono text-slate-200 leading-none">{totalHours}</span>
          <span className="text-[10px] font-bold text-emerald-600/60 uppercase italic tracking-widest mb-1">giờ</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-3 flex items-center gap-2 uppercase tracking-widest font-bold">
          <TrendingUp size={12} className="text-emerald-500/50" />
          Từ {completed.length} buổi đã học
        </p>
      </div>

      {/* Đánh giá hệ thống */}
      <div className="flex-1 w-full pt-6 md:pt-0 px-2 md:pl-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={14} className="text-amber-500/60" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Đánh giá hệ thống</span>
        </div>
        <div className="flex flex-col justify-center h-[52px]">
          <span className={`text-[11px] font-black uppercase tracking-widest ${statusColor}`}>
            {statusText}
          </span>
          <p className="text-[11px] text-slate-400 mt-2">
            {upcoming.length > 0 
              ? `${upcoming.length} buổi sắp tới đang chờ.` 
              : "Chưa có lịch trình mới."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- Schedule Section ---
function ScheduleSection({ title, dotColor, count, emptyText, children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div variants={itemVariants} className="bg-white/[0.01] border border-white/[0.05] rounded-md overflow-hidden mb-6 transition-all hover:border-white/[0.1]">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}` }} />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-sm">{count} Buổi</span>
          <button onClick={() => setCollapsed((v) => !v)} className="text-slate-600 hover:text-emerald-500 transition-colors">
            <ChevronDown size={14} style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
          </button>
        </div>
      </div>
      {!collapsed && (
        <div className="p-2 sm:p-6 bg-white/[0.005]">
          {count === 0 ? (
            <div className="py-8 text-center text-[11px] text-slate-600 uppercase tracking-widest font-medium">{emptyText}</div>
          ) : (
            <div className="space-y-4">
              {children}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// --- Mini Calendar ---
const DAYS_OF_WEEK = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const MONTHS_VI = ["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];

function MiniCalendar({ appointments = [] }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const appointmentDays = useMemo(() => {
    const set = new Set();
    appointments.forEach((a) => {
      if (a.status === "pending" || a.status === "accepted") {
        const d = new Date(a.date || a.startTime);
        if (d.getFullYear() === year && d.getMonth() === month) {
          set.add(d.getDate());
        }
      }
    });
    return set;
  }, [appointments, year, month]);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div variants={itemVariants} className="bg-white/[0.01] border border-white/[0.05] rounded-md overflow-hidden p-5">
      <div className="flex items-center justify-between mb-4">
        <button className="text-slate-600 hover:text-emerald-500 transition-colors p-1" onClick={prevMonth}>
          <ChevronLeft size={14} />
        </button>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          {MONTHS_VI[month]}, {year}
        </span>
        <button className="text-slate-600 hover:text-emerald-500 transition-colors p-1" onClick={nextMonth}>
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 gap-x-1 mb-2">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="text-[9px] text-slate-600 text-center font-bold uppercase tracking-widest">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-2 gap-x-1">
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const hasAppt = appointmentDays.has(day);
          
          return (
            <div key={day} className="text-center group">
              <div className={`text-[11px] font-mono py-1 rounded-sm cursor-pointer transition-all ${
                isToday ? "bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30" 
                : hasAppt ? "bg-slate-800 text-slate-200 border border-transparent" 
                : "text-slate-500 group-hover:text-slate-300 group-hover:bg-white/[0.02] border border-transparent"
              }`}>
                {day}
              </div>
              {hasAppt && !isToday && (
                <div className="w-1 h-1 rounded-full bg-blue-500/50 mx-auto mt-1" />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// --- Main Page Component ---
export default function StudentMySchedulePage() {
  const { data, isLoading } = useAppointments();
  const [modalState, setModalState] = useState({ type: null, selectedAppointment: null });
  
  const { upcoming, completed, cancelled, allAppointments } = useMemo(() => {
    const active = data?.active || [];
    const history = data?.history || [];
    return {
      upcoming: active.filter((a) => a.status === "pending" || a.status === "accepted"),
      completed: history.filter((a) => a.status === "completed"),
      cancelled: history.filter((a) => a.status === "cancelled" || a.status === "declined"),
      allAppointments: [...active, ...history]
    };
  }, [data]);

  if (isLoading) return <LoadingModal />;

  const handleModalState = (appointment, type) => setModalState({ type, selectedAppointment: appointment });
  const handleCloseModal = () => setModalState({ type: null, selectedAppointment: null });

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-400 p-6 md:pl-10 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* Background Glow - Tông màu xanh dương để phân biệt nhẹ với Dashboard */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/[0.02] blur-[150px] rounded-full pointer-events-none" 
      />
      
      <motion.div 
        variants={containerVariants} initial="hidden" animate="visible"
        className="relative z-10 max-w-[1300px] px-2 py-8 md:py-16 mx-auto"
      >

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Main) */}
          <div className="col-span-12 lg:col-span-8 min-w-0">
            <PerformanceOverview completed={completed} cancelled={cancelled} upcoming={upcoming} />

            <ScheduleSection title="Sắp diễn ra" dotColor="#3b82f6" count={upcoming.length} emptyText="Không có lịch học sắp tới.">
              {upcoming.map((appt) => (
                <AppointmentCard key={appt._id} appointment={appt} onCancel={() => handleModalState(appt, "cancel")} onCancelBeforeAccept={() => handleModalState(appt, "cancel-before-accept")} onReschedule={() => handleModalState(appt, "reschedule")} onFeedback={() => handleModalState(appt, "feedback")} onReport={() => handleModalState(appt, "report")} />
              ))}
            </ScheduleSection>

            <ScheduleSection title="Đã hoàn thành" dotColor="#10b981" count={completed.length} emptyText="Chưa có dữ liệu hoàn thành.">
              {completed.map((appt) => (
                <AppointmentCard key={appt._id} appointment={appt} onCancel={() => handleModalState(appt, "cancel")} onCancelBeforeAccept={() => handleModalState(appt, "cancel-before-accept")} onReschedule={() => handleModalState(appt, "reschedule")} onFeedback={() => handleModalState(appt, "feedback")} onReport={() => handleModalState(appt, "report")} />
              ))}
            </ScheduleSection>

            <ScheduleSection title="Đã hủy bỏ" dotColor="#ef4444" count={cancelled.length} emptyText="Không có lịch học nào bị hủy.">
              {cancelled.map((appt) => (
                <AppointmentCard key={appt._id} appointment={appt} onCancel={() => handleModalState(appt, "cancel")} onCancelBeforeAccept={() => handleModalState(appt, "cancel-before-accept")} onReschedule={() => handleModalState(appt, "reschedule")} onFeedback={() => handleModalState(appt, "feedback")} onReport={() => handleModalState(appt, "report")} />
              ))}
            </ScheduleSection>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="col-span-12 lg:col-span-4 sticky top-10 space-y-6">
            <MiniCalendar appointments={allAppointments} />
          </div>

        </div>
      </motion.div>

      {/* Modals */}
      <CancelModal slot={modalState.selectedAppointment} open={modalState.type === "cancel"} onClose={handleCloseModal} />
      <CancelBeforeAcceptModal appointment={modalState.selectedAppointment} open={modalState.type === "cancel-before-accept"} onClose={handleCloseModal} />
      <RescheduleModal open={modalState.type === "reschedule"} appointment={modalState.selectedAppointment} onClose={handleCloseModal} />
      <FeedbackModal open={modalState.type === "feedback"} appointment={modalState.selectedAppointment} onClose={handleCloseModal} />
      <ReportModal open={modalState.type === "report"} onClose={handleCloseModal} appointment={modalState.selectedAppointment} />
    </div>
  );
}