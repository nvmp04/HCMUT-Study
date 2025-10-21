import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../components/LoadingModal";
import SessionCard from "./SessionCard";
import CancelModal from "../../../components/CancelModal";
import { useSocket } from "../../../hooks/useSocket";
import ReportModal from "../../../components/ReportModal";

export default function TutorAppointmentsPage() {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const url = "http://localhost:5000/tutor/getappointments";

  const { data, isLoading } = useQuery({
    queryKey: ["tutorappointments"],
    queryFn: async () => await fetchAPI(url, "GET", null, true),
  });

  const [selectedSession, setSelectedSession] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [tab, setTab] = useState("upcoming");
  useEffect(() => {
    if (!socket) return;

    function handleEvent({ tutorId }) {
      const id = sessionStorage.getItem("id");
      if (id === tutorId) {
        queryClient.invalidateQueries(["tutorschedule"]);
      }
    }

    const events = ["appointment-updated", "decline", "appointment-cancelled"];
    events.forEach((event) => socket.on(event, handleEvent));

    return () => {
      events.forEach((event) => socket.off(event, handleEvent));
    };
  }, [queryClient, socket]);

  if (isLoading) return <LoadingModal />;

  const appointments = data?.appointment || [];
  const upcomingSessions = appointments.filter((s) => s.status === "accepted");
  const pastSessions = appointments.filter((s) => s.status === "completed");

  const filteredSessions = tab === "upcoming" ? upcomingSessions : pastSessions;

  const handleCancelSession = (session) => {
    setSelectedSession(session);
    setCancelModal(true);
  };

  const handleOpenReport = (session) => {
    setSelectedSession(session);
    setReportModal(true);
  };
  const handleSubmitReport = async (reportData) => {
    const url = 'http://localhost:5000/tutor/report'
    await fetchAPI(url, 'PUT', {report: reportData}, true);
    queryClient.invalidateQueries({queryKey: ["tutorappointments"]});
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Quản lý cuộc hẹn của bạn
        </h1>
        <p className="text-slate-500 text-sm">
          Theo dõi và quản lý các buổi dạy của bạn một cách dễ dàng
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b">
        {[
          { id: "upcoming", label: "Sắp tới", count: upcomingSessions.length },
          { id: "past", label: "Đã diễn ra", count: pastSessions.length },
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
            {t.label}
            <span className="ml-1 text-sm text-slate-500">({t.count})</span>
          </button>
        ))}
      </div>

      {/* Nội dung tab */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <div className="max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent space-y-4">
          {filteredSessions.length === 0 ? (
            <div className="text-center text-slate-500 py-10">
              {tab === "upcoming"
                ? "Không có buổi dạy sắp tới"
                : "Chưa có buổi học nào đã diễn ra"}
            </div>
          ) : (
            filteredSessions.map((session) => (
              <SessionCard
                refetch={() =>
                  queryClient.invalidateQueries(["tutorschedule"])
                }
                key={session._id || session.id}
                session={session}
                isPast={tab === "past"}
                isFailed={false}
                onCancel={handleCancelSession}
                onReport={handleOpenReport}
              />
            ))
          )}
        </div>
      </div>

      {/* --- Modals --- */}
      <CancelModal
        slot={selectedSession}
        open={cancelModal}
        onClose={() => setCancelModal(false)}
      />
      <ReportModal
        open={reportModal}
        onClose={() => setReportModal(false)}
        session={selectedSession}
        onSubmit={handleSubmitReport}
      />
    </div>
  );
}
