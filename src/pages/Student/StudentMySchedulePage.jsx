import { useMemo, useState } from "react";
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
  CheckCircle2,
  XCircle,
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Mini Calendar (static display, no logic change) ────────────────────────
const DAYS_OF_WEEK = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
const MONTHS_VI = [
  "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6",
  "Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12",
];

function MiniCalendar({ appointments = [] }) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Ngày có appointment (dùng data thật)
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
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-[0.9rem] pb-[0.6rem]">
        <button className="bg-none border-none text-gray-400 cursor-pointer flex items-center p-1 rounded" onClick={prevMonth}>
          <ChevronLeft size={14} />
        </button>
        <span className="text-sm font-medium text-slate-900">
          {MONTHS_VI[month]}, {year}
        </span>
        <button className="bg-none border-none text-gray-400 cursor-pointer flex items-center p-1 rounded" onClick={nextMonth}>
          <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0.5 px-[0.9rem] pb-[0.9rem]">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="text-xs text-gray-400 p-0.5 uppercase tracking-widest">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (!day) return <div key={`e-${i}`} />;
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          const hasAppt = appointmentDays.has(day);
          return (
            <div key={day} className="text-center">
              <div
                className={`text-sm p-1 rounded cursor-pointer leading-tight ${
                  isToday 
                    ? "bg-teal-600 text-white font-semibold" 
                    : "text-gray-700"
                }`}
              >
                {day}
              </div>
              {hasAppt && !isToday && (
                <div className="w-1 h-1 rounded-full bg-blue-500 mx-auto mt-0.5" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, accentColor, bgColor, iconColor, icon: Icon }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: accentColor }} />
      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 mt-1" style={{ background: bgColor }}>
        <Icon size={16} color={iconColor} />
      </div>
      <div className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-0.5">{label}</div>
      <div className="text-2xl font-bold text-slate-900 leading-tight">{value}</div>
      {sub && <div className="text-xs text-slate-500 mt-0.5">{sub}</div>}
    </div>
  );
}

// ─── Section Component ────────────────────────────────────────────────────────
function ScheduleSection({ title, dot, badge, badgeStyle, emptyText, children, count }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-5">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: dot }} />
          <span className="text-sm font-semibold text-slate-900">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={badgeStyle}>{count} buổi</span>
          <button
            className="bg-none border-none cursor-pointer text-gray-400 flex items-center"
            onClick={() => setCollapsed((v) => !v)}
          >
            <ChevronDown
              size={14}
              style={{
                transform: collapsed ? "rotate(-90deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>
        </div>
      </div>
      {!collapsed && (
        <div>
          {count === 0 ? (
            <div className="p-8 text-center text-gray-400 text-sm">{emptyText}</div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}


export default function StudentMySchedulePage() {
  const { data, isLoading } = useAppointments();
  const [modalState, setModalState] = useState({ type: null, selectedAppointment: null });
  const { upcoming, completed, cancelled, allAppointments } = useMemo(() => {
    const active = data?.active || [];
    const history = data?.history || [];

    return {
      upcoming: active.filter((a) => a.status === "pending" || a.status === "accepted"),
      completed: history.filter((a) => a.status === "completed"),
      
      cancelled: history.filter((a) => a.status === "cancelled"),
      
      allAppointments: [...active, ...history]
    };
  }, [data]);

  if (isLoading) return <LoadingModal />;

  const handleModalState = (appointment, type) =>
    setModalState({ type, selectedAppointment: appointment });

  const handleCloseModal = () =>
    setModalState({ type: null, selectedAppointment: null });

  return (
    <div className="font-dm bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* ── Page header ── */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight m-0">Quản lý lịch học</h1>
          <p className="text-xs text-gray-500 mt-1">Tổng hợp toàn bộ tiến độ học tập của bạn.</p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-7">
          <StatCard label="Sắp tới" value={upcoming.length} sub="Chờ & Đã nhận" accentColor="#378ADD" bgColor="#E6F1FB" iconColor="#185FA5" icon={Clock} />
          <StatCard label="Hoàn thành" value={completed.length} sub="Tổng cộng" accentColor="#1D9E75" bgColor="#E1F5EE" iconColor="#0F6E56" icon={CheckCircle2} />
          <StatCard label="Đã hủy" value={cancelled.length} sub="Tổng cộng" accentColor="#E24B4A" bgColor="#FCEBEB" iconColor="#A32D2D" icon={XCircle} />
          <StatCard label="Tổng buổi học" value={allAppointments.length} sub="Tất cả trạng thái" accentColor="#EF9F27" bgColor="#FAEEDA" iconColor="#854F0B" icon={Star} />
        </div>

        {/* ── Content grid ── */}
        <div className="grid grid-cols-[1fr_288px] gap-6 items-start">
          <div className="min-w-0">
            {/* Section: Sắp tới */}
            <ScheduleSection title="Lịch học sắp tới" dot="#378ADD" badgeStyle={{ background: "#E6F1FB", color: "#185FA5" }} count={upcoming.length} emptyText="Hiện tại bạn không có lịch học nào sắp tới.">
              {upcoming.map((appt) => (
                <AppointmentCard key={appt._id} appointment={appt} onCancel={() => handleModalState(appt, "cancel")} onCancelBeforeAccept={() => handleModalState(appt, "cancel-before-accept")} onReschedule={() => handleModalState(appt, "reschedule")} onFeedback={() => handleModalState(appt, "feedback")} onReport={() => handleModalState(appt, "report")} />
              ))}
            </ScheduleSection>

            {/* Section: Hoàn thành */}
            <ScheduleSection title="Lịch học đã hoàn thành" dot="#1D9E75" badgeStyle={{ background: "#EAF3DE", color: "#3B6D11" }} count={completed.length} emptyText="Chưa có dữ liệu về các buổi học đã hoàn thành.">
              {completed.map((appt) => (
                <AppointmentCard key={appt._id} appointment={appt} onCancel={() => handleModalState(appt, "cancel")} onCancelBeforeAccept={() => handleModalState(appt, "cancel-before-accept")} onReschedule={() => handleModalState(appt, "reschedule")} onFeedback={() => handleModalState(appt, "feedback")} onReport={() => handleModalState(appt, "report")} />
              ))}
            </ScheduleSection>

            {/* Section: Đã hủy */}
            <ScheduleSection title="Lịch học đã hủy" dot="#E24B4A" badgeStyle={{ background: "#FCEBEB", color: "#A32D2D" }} count={cancelled.length} emptyText="Không có lịch học nào bị hủy.">
              {cancelled.map((appt) => (
                <AppointmentCard key={appt._id} appointment={appt} onCancel={() => handleModalState(appt, "cancel")} onCancelBeforeAccept={() => handleModalState(appt, "cancel-before-accept")} onReschedule={() => handleModalState(appt, "reschedule")} onFeedback={() => handleModalState(appt, "feedback")} onReport={() => handleModalState(appt, "report")} />
              ))}
            </ScheduleSection>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5 sticky top-19">
            <MiniCalendar appointments={allAppointments} />
          </div>
        </div>
      </div>
      <CancelModal
        slot={modalState.selectedAppointment}
        open={modalState.type === "cancel"}
        onClose={handleCloseModal}
      />
      <CancelBeforeAcceptModal
        appointment={modalState.selectedAppointment}
        open={modalState.type === "cancel-before-accept"}
        onClose={handleCloseModal}
      />
      <RescheduleModal
        open={modalState.type === "reschedule"}
        appointment={modalState.selectedAppointment}
        onClose={handleCloseModal}
      />
      <FeedbackModal
        open={modalState.type === "feedback"}
        appointment={modalState.selectedAppointment}
        onClose={handleCloseModal}
      />
      <ReportModal
        open={modalState.type === "report"}
        onClose={handleCloseModal}
        appointment={modalState.selectedAppointment}
      />
    </div>
  );
}