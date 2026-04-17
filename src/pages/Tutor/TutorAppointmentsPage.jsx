import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import AppointmentCard from "../../features/appointment/components/AppointmentCard";
import CancelModal from "../../components/CancelModal";
import CancelBeforeAcceptModal from "../../features/appointment/components/CancelBeforeAcceptModal";
import RescheduleModal from "../../features/appointment/components/RescheduleModal";
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
  AlertCircle,
  GraduationCap
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

// --- Performance Overview (Dành cho Tutor) ---
function PerformanceOverview({ completed, cancelled, upcoming }) {
  const totalPast = completed.length + cancelled.length;
  const completionRate = totalPast === 0 ? 0 : Math.round((completed.length / totalPast) * 100);
  const totalHours = (completed.length * 1.5).toFixed(1);

  return (
    <motion.div variants={itemVariants} className="bg-[#1e293b]/20 border border-white/[0.05] rounded-md p-6 mb-8 backdrop-blur-sm flex flex-col md:flex-row items-center gap-8 divide-y md:divide-y-0 md:divide-x divide-white/[0.05]">
      
      <div className="flex-1 w-full pt-4 md:pt-0 px-2">
        <div className="flex items-center gap-2 mb-4">
          <Target size={14} className="text-fuchsia-500/60" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Tỷ lệ hoàn thành buổi dạy</span>
        </div>
        <div className="flex items-end gap-3 mb-3">
          <span className="text-4xl font-mono text-slate-200 leading-none">{completionRate}%</span>
        </div>
        <div className="w-full bg-white/[0.02] h-[3px] rounded-full overflow-hidden">
          <div className="h-full rounded-full transition-all duration-1000 bg-fuchsia-500/50" style={{ width: `${completionRate}%` }} />
        </div>
      </div>

      <div className="flex-1 w-full pt-6 md:pt-0 px-2 md:pl-8">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={14} className="text-emerald-500/60" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Tổng giờ giảng dạy</span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-mono text-slate-200 leading-none">{totalHours}</span>
          <span className="text-[10px] font-bold text-emerald-600/60 uppercase italic tracking-widest mb-1">giờ</span>
        </div>
        <p className="text-[10px] text-slate-500 mt-3 flex items-center gap-2 uppercase tracking-widest font-bold">
          <TrendingUp size={12} className="text-emerald-500/50" />
          Đã thực hiện {completed.length} phiên
        </p>
      </div>

      <div className="flex-1 w-full pt-6 md:pt-0 px-2 md:pl-8">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap size={14} className="text-amber-500/60" />
          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Trạng thái dạy học</span>
        </div>
        <div className="flex flex-col justify-center h-[52px]">
          <span className="text-[11px] font-black uppercase tracking-widest text-emerald-500/80">
            Tutor Active
          </span>
          <p className="text-[11px] text-slate-400 mt-2">
            {upcoming.length > 0 ? `${upcoming.length} lịch chờ dạy.` : "Lịch trình đang trống."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- Schedule Section (Giữ nguyên logic Student) ---
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
          <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-sm">{count} Phiên</span>
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
            <div className="space-y-4">{children}</div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// --- Mini Calendar (Giữ nguyên logic Student) ---
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
        if (d.getFullYear() === year && d.getMonth() === month) set.add(d.getDate());
      }
    });
    return set;
  }, [appointments, year, month]);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <motion.div variants={itemVariants} className="bg-white/[0.01] border border-white/[0.05] rounded-md overflow-hidden p-5">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="text-slate-600 p-1"><ChevronLeft size={14} /></button>
        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{month + 1}/{year}</span>
        <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="text-slate-600 p-1"><ChevronRight size={14} /></button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(d => <div key={d} className="text-[9px] text-slate-600 font-bold">{d}</div>)}
        {cells.map((day, i) => (
          <div key={i} className={`text-[11px] font-mono py-1 rounded-sm ${day === today.getDate() && month === today.getMonth() ? "bg-fuchsia-600/20 text-fuchsia-400" : appointmentDays.has(day) ? "bg-slate-800 text-slate-200" : "text-slate-600"}`}>
            {day}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --- Main Tutor Page ---
export default function TutorMySchedulePage() {
  const { data, isLoading } = useAppointments();
  const [modalState, setModalState] = useState({ type: null, selectedAppointment: null });

  const { upcoming, completed, cancelled, allAppointments } = useMemo(() => {
    const active = data?.active || [];
    const history = data?.history || [];
    console.log(data)
    return {
      upcoming: active.filter((a) => a.status === "pending" || a.status === "accepted"),
      completed: history.filter((a) => a.status === "completed"),
      cancelled: history.filter((a) => a.status === "cancelled" || a.status === "declined"),
      allAppointments: [...active, ...history]
    };
  }, [data]);


  const handleModalState = (appointment, type) => setModalState({ type, selectedAppointment: appointment });
  const handleCloseModal = () => setModalState({ type: null, selectedAppointment: null });

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-400 p-6 md:pl-10 relative overflow-hidden">
      
      {/* Glow màu Fuchsia để phân biệt với Student */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-500/[0.03] blur-[150px] rounded-full pointer-events-none" 
      />

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="relative z-10 max-w-[1300px] py-8 md:py-16 mx-auto">
        <div className="grid grid-cols-12 gap-8 items-start">
          
          <div className="col-span-12 lg:col-span-8">
            <PerformanceOverview completed={completed} cancelled={cancelled} upcoming={upcoming} />

            <ScheduleSection title="Lịch dạy sắp tới" dotColor="#f107f1" count={upcoming.length} emptyText="Không có buổi dạy nào được đặt.">
              {upcoming.map((appt) => (
                <AppointmentCard
                  key={appt._id}
                  appointment={appt}
                  onCancel={() => handleModalState(appt, "cancel")}
                  onReport={() => handleModalState(appt, "report")}
                />
              ))}
            </ScheduleSection>

            <ScheduleSection title="Lịch sử giảng dạy" dotColor="#10b981" count={completed.length} emptyText="Chưa hoàn thành buổi dạy nào.">
              {completed.map((appt) => (
                <AppointmentCard
                  key={appt._id}
                  appointment={appt}
                  onReport={() => handleModalState(appt, "report")}
                />
              ))}
            </ScheduleSection>

            <ScheduleSection title="Yêu cầu đã hủy" dotColor="#ef4444" count={cancelled.length} emptyText="Không có lịch hủy.">
              {cancelled.map((appt) => (
                <AppointmentCard
                  key={appt._id}
                  appointment={appt}
                />
              ))}
            </ScheduleSection>
          </div>

          <div className="col-span-12 lg:col-span-4 sticky top-10">
            <MiniCalendar appointments={allAppointments} />
          </div>

        </div>
      </motion.div>

      {/* Modals */}
      <CancelModal slot={modalState.selectedAppointment} open={modalState.type === "cancel"} onClose={handleCloseModal} />
      <CancelBeforeAcceptModal appointment={modalState.selectedAppointment} open={modalState.type === "cancel-before-accept"} onClose={handleCloseModal} />
      <RescheduleModal open={modalState.type === "reschedule"} appointment={modalState.selectedAppointment} onClose={handleCloseModal} />
      <ReportModal open={modalState.type === "report"} onClose={handleCloseModal} appointment={modalState.selectedAppointment} />
    </div>
  );
}