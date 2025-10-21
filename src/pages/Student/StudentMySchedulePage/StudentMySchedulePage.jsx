import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../components/LoadingModal";
import SessionCard from "./SessionCard";
import CancelModal from "../../../components/CancelModal";
import CancelBeforeAcceptModal from "./CancelBeforeAcceptModal";
import RescheduleModal from "./RescheduleModal";
import FeedbackModal from "./FeedbackModal";
import { useSocket } from "../../../hooks/useSocket";
import ReportModal from "../../../components/ReportModal";

export default function StudentMySchedulePage() {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const url = "http://localhost:5000/student/getmyschedule";

  const { data, isLoading } = useQuery({
    queryKey: ["studentschedule"],
    queryFn: async () => await fetchAPI(url, "GET", null, true),
  });

  const [warning, setWarning] = useState(false);
  const [superWarning, setSuperWarning] = useState(false);
  const [tab, setTab] = useState("upcoming");
  const [selectedSession, setSelectedSession] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [cancelBeforeAccept, setCancelBeforeAccept] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!socket) return;
    function handleEvent({ studentId }) {
      const id = sessionStorage.getItem("id");
      if (id === studentId) {
        queryClient.invalidateQueries(["studentschedule"]);
      }
    }
    const events = ["appointment-updated", "decline"];
    events.forEach((event) => socket.on(event, handleEvent));
    return () => {
      events.forEach((event) => socket.off(event, handleEvent));
    };
  }, [queryClient, socket]);

  if (isLoading) return <LoadingModal />;

  const appointments = data?.appointment || [];

  const upcomingSessions = appointments.filter(
    (s) => s.status !== "completed" && s.status !== "cancelled"
  );
  const pastSessions = appointments.filter((s) => s.status === "completed");
  const cancelledSessions = appointments.filter((s) => s.status === "cancelled");

  const filteredSessions =
    tab === "upcoming"
      ? upcomingSessions
      : tab === "past"
      ? pastSessions
      : cancelledSessions;

  const handleCancelSession = (session) => {
    setSelectedSession(session);
    if (session.status === "pending") setCancelBeforeAccept(true);
    else setCancelModal(true);
  };

  const handleRescheduleSession = (session) => {
    setSelectedSession(session);
    setRescheduleModal(true);
  };

  const handleProvideFeedback = (session) => {
    setSelectedSession(session);
    setFeedbackModal(true);
  };

  const handleOpenReport = (session) => {
    setSelectedSession(session);
    setReportModal(true);
  };
  
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
          { id: "upcoming", label: "Sắp tới", count: upcomingSessions.length },
          { id: "past", label: "Đã diễn ra", count: pastSessions.length },
          { id: "cancelled", label: "Đã hủy", count: cancelledSessions.length },
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
          {filteredSessions.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              {tab === "upcoming"
                ? "Không có buổi học sắp tới"
                : tab === "past"
                ? "Chưa có buổi học nào đã diễn ra"
                : "Không có buổi học nào đã bị hủy"}
            </div>
          ) : (
            filteredSessions.map((session) => (
              <SessionCard
                refetch={() => queryClient.invalidateQueries(["studentschedule"])}
                key={session._id || session.id}
                session={session}
                isPast={session.status === "completed"}
                isFailed={session.status === "cancelled"}
                onCancel={handleCancelSession}
                onReschedule={handleRescheduleSession}
                onFeedback={handleProvideFeedback}
                onReport={handleOpenReport}
              />
            ))
          )}
        </div>
      </div>

      {/* --- Modal --- */}
      <CancelModal
        slot={selectedSession}
        open={cancelModal}
        onClose={() => {
          setCancelModal(false);
          setWarning(false);
          setSuperWarning(false);
          setReason("");
        }}
        isWarning={warning}
        isSuperWarning={superWarning}
      />
      <CancelBeforeAcceptModal
        slot={selectedSession}
        open={cancelBeforeAccept}
        onClose={() => setCancelBeforeAccept(false)}
      />
      <RescheduleModal
        appointment={data.appointment}
        open={rescheduleModal}
        session={selectedSession}
        onClose={() => setRescheduleModal(false)}
      />
      <FeedbackModal
        open={feedbackModal}
        session={selectedSession}
        onClose={() => setFeedbackModal(false)}
      />
      <ReportModal
        open={reportModal}
        onClose={() => setReportModal(false)}
        session={selectedSession}
      />
    </div>
  );
}
