import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from "../../../App";
import SessionCard from "./SessionCard";
import CancelModal from "../../../components/CancelModal";
import CancelBeforeAcceptModal from "./CancelBeforeAcceptModal";
import RescheduleModal from "./RescheduleModal";
import FeedbackModal from "./FeedbackModal";

const socket = io("http://localhost:5000");
export default function StudentMySchedulePage() {
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
  const [reason, setReason] = useState("");
  useEffect(() => {
    function handleEvent({ studentId }) {
      console.log(studentId);
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
  }, [queryClient]);
  if (isLoading) return <LoadingModal />;
  const filteredSessions =
    data?.appointment?.filter((s) => {
      if (tab === "upcoming") return s.status !== "completed" && s.status !== "cancelled";
      if (tab === "past") return s.status === "completed";
      if (tab === "cancelled") return s.status === "cancelled";
      return true;
    }) || [];
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
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Lịch học của tôi</h1>
        <p className="text-sm text-slate-500">
          Xem và quản lý các buổi học của bạn 
        </p>
      </div>
      <div className="flex gap-2 mb-6 border-b">
        {[
          { id: "upcoming", label: "Sắp tới" },
          { id: "past", label: "Đã diễn ra" },
          { id: "cancelled", label: "Đã hủy" },
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
          </button>
        ))}
      </div>
      <div>
        
        {filteredSessions.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            Không có buổi học nào trong mục này
          </div>
        ) : (
          filteredSessions.map((session) => (
            
              <SessionCard
                refetch={()=>queryClient.invalidateQueries(["studentschedule"])}
                key={session._id || session.id}
                session={session}
                isPast={session.status === "completed"}
                isFailed={session.status === "cancelled"}
                onCancel={handleCancelSession}
                onReschedule={handleRescheduleSession}
                onFeedback={handleProvideFeedback}
              />
          )
        ))}
      </div>
      <CancelModal
        slot={selectedSession}
        open={cancelModal}
        onClose={() => {
          setCancelModal(false);
          setWarning(false);
          setSuperWarning(false);
          setReason('');
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
    </div>
  );
}
