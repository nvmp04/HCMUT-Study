import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LoadingModal } from "../../components/LoadingModal";
import AppointmentCard from "../../features/appointment/components/AppointmentCard";
import CancelModal from "../../components/CancelModal";
import CancelBeforeAcceptModal from "../../features/appointment/components/CancelBeforeAcceptModal";
import RescheduleModal from "../../features/appointment/components/RescheduleModal";
import FeedbackModal from "../../features/feedback/components/FeedbackModal";
import { useSocket } from "../../features/websocket/hooks/useSocket";
import ReportModal from "../../components/ReportModal";
import { useAppointments } from "../../features/appointment/hooks/useAppointments";
import { useAppointmentFilter } from "../../features/appointment/hooks/useAppointmentFilter";

export default function StudentMySchedulePage() {
  const {socket} = useSocket();
  const { data, isLoading } = useAppointments();
  const queryClient = useQueryClient();
  const [warning, setWarning] = useState(false);
  const [superWarning, setSuperWarning] = useState(false);
  const [tab, setTab] = useState("pending");
  
  const [modalState, setModalState] = useState({
    type: null, 
    selectedAppointment: null
  })
  const [reason, setReason] = useState("");
  const id = sessionStorage.getItem("id");
  useEffect(() => {
    if (!socket) return;
    function handleEvent({ studentId, _id }) {
      if(id !== studentId) return;
      if(_id === selectedAppointment._id) {
        handleCloseModal();
        setReason("");
      }
      queryClient.invalidateQueries(["studentschedule"]);
    }
    const events = ["appointment-updated", "decline"];
    events.forEach((event) => socket.on(event, handleEvent));
    return () => {
      events.forEach((event) => socket.off(event, handleEvent));
    };
  }, [socket, modalState.selectedAppointment]);

  const appointments = data?.appointments || [];
  const {pendingAppt, cancelledAppt, completedAppt} = useAppointmentFilter(appointments);
  const filteredAppointments = {
    "pending": pendingAppt, 
    "completed": completedAppt, 
    "cancelled": cancelledAppt
  }
  if (isLoading) return <LoadingModal />;

  // Hàm đóng mở các Modal
  const handleModalState = (appointment, type) =>{
    setModalState({type, selectedAppointment: appointment})
  }
  const handleCloseModal = () => {
    setModalState({type: null, selectedAppointment: null})
  }
  
  return (
    <div className="max-w-7xl mx-auto p-5 min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Lịch học của tôi</h1>
        <p className="text-sm text-slate-500">
          Xem và quản lý các buổi học của bạn một cách dễ dàng
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        {[
          { id: "pending", label: "Sắp tới", count: pendingAppt.length },
          { id: "completed", label: "Đã diễn ra", count: completedAppt.length },
          { id: "cancelled", label: "Đã hủy", count: cancelledAppt.length },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 font-medium border-b-2 transition-colors ${
              tab === t.id
                ? "text-blue-700 border-blue-700"
                : "text-gray-500 border-transparent hover:text-blue-600"
            }`}
          >
            {t.label}{" "}
            <span className="ml-1 text-sm text-slate-500">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Nội dung chính */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <div className="max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent space-y-4">
          {filteredAppointments[tab].length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              {tab === "pending"
                ? "Không có buổi học sắp tới"
                : tab === "completed"
                ? "Chưa có buổi học nào đã diễn ra"
                : "Không có buổi học nào đã bị hủy"}
            </div>
          ) : (
            filteredAppointments[tab].map((appointment) => (
              <AppointmentCard
                key={appointment._id || appointment.id}
                appointment={appointment}
                isCompleted={appointment.status === "completed"}
                isCancelled={appointment.status === "cancelled"}
                onCancel={()=>handleModalState(appointment, 'cancel')}
                onCancelBeforeAccept={()=>handleModalState(appointment, 'cancel-before-accept')}
                onReschedule={()=>handleModalState(appointment, 'reschedule')}
                onFeedback={()=>handleModalState(appointment, 'feedback')}
                onReport={()=>handleModalState(appointment, 'report')}
              />
            ))
          )}
        </div>
      </div>

      {/* --- Modal --- */}
      <CancelModal
        slot={modalState.selectedAppointment}
        open={modalState.type === 'cancel'}
        onClose={() => {
          handleCloseModal();
          setWarning(false);
          setSuperWarning(false);
          setReason("");
        }}
        isWarning={warning}
        isSuperWarning={superWarning}
      />
      <CancelBeforeAcceptModal
        appointment={modalState.selectedAppointment}
        open={modalState.type === 'cancel-before-accept'}
        onClose={handleCloseModal}
      />
      <RescheduleModal
        open={modalState.type === 'reschedule'}
        appointment={modalState.selectedAppointment}
        onClose={handleCloseModal}
      />
      <FeedbackModal
        open={modalState.type === 'feedback'}
        appointment={modalState.selectedAppointment}
        onClose={handleCloseModal}
      />
      <ReportModal
        open={modalState.type === 'report'}
        onClose={handleCloseModal}
        appointment={modalState.selectedAppointment}
      />
    </div>
  );
}
