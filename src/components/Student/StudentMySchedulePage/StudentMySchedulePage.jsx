import React, { useState } from "react";
import SessionCard from "./SessionCard";
import CancelModal from "./CancelModal";
import RescheduleModal from "./RescheduleModal";
import FeedbackModal from "./FeedbackModal";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../../../utils/fetchAPI";
import { LoadingModal } from '../../../App';

export default function StudentMySchedulePage() {
  const url = 'http://localhost:5000/student/getmyschedule';
  const { data, isLoading } = useQuery({
    queryKey: ['schedule'],
    queryFn: async () => await fetchAPI(url, 'GET', null, true)
  });
  const [tab, setTab] = useState("upcoming");
  const [selectedSession, setSelectedSession] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  if (isLoading) return <LoadingModal />;
  const filteredSessions = data?.appointment?.filter((s) => {
    const now = new Date();
    const parts = s.date.split(", ")[1];
    const [day, month, year] = parts.split("/").map(Number);
    const [startTime] = s.time.split(" - "); 
    const [hours, minutes] = startTime.split(":").map(Number);
    const sessionDateTime = new Date(year, month - 1, day, hours, minutes);
    if (tab === "upcoming") return (sessionDateTime >= now && s.status !== 'cancelled');
    if (tab === "past") return sessionDateTime < now || s.status === "completed";
    if (tab === "cancelled") return s.status === "cancelled";
    return true;
  }) || [];

  const handleCancelSession = (session) => {
    setSelectedSession(session);
    setCancelModal(true);
  };

  const handleRescheduleSession = (session) => {
    setSelectedSession(session);
    setRescheduleModal(true);
  };

  const handleProvideFeedback = (session) => {
    setSelectedSession(session);
    setFeedbackModal(true);
  };

  const handleCancelSubmit = (data) => {
    console.log("📤 Hủy buổi học:", data);
  };

  const handleRescheduleSubmit = (data) => {
    console.log("📤 Đổi lịch:", data);
  };

  const handleFeedbackSubmit = (data) => {
    console.log("📤 Gửi đánh giá:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Lịch học của tôi</h1>
        <p className="text-sm text-slate-500">Xem và quản lý các buổi học của bạn</p>
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
            className={`px-4 py-2 font-medium border-b-2 ${
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
          filteredSessions.map((session) => {
            const isPast = new Date(session.date) < new Date();
            const isFailed =
              session.status === "cancelled" ||
              session.status === "expired_pending";

            return (
              <SessionCard
                key={session.id}
                session={session}
                isPast={isPast}
                isFailed={isFailed}
                onCancel={handleCancelSession}
                onReschedule={handleRescheduleSession}
                onFeedback={handleProvideFeedback}
              />
            );
          })
        )}
      </div>

      {/* Modals */}
      <CancelModal
        open={cancelModal}
        session={selectedSession}
        onClose={() => setCancelModal(false)}
        onSubmit={handleCancelSubmit}
      />

      <RescheduleModal
        open={rescheduleModal}
        session={selectedSession}
        onClose={() => setRescheduleModal(false)}
        onSubmit={handleRescheduleSubmit}
      />

      <FeedbackModal
        open={feedbackModal}
        session={selectedSession}
        onClose={() => setFeedbackModal(false)}
        onSubmit={handleFeedbackSubmit}
      />
    </div>
  );
}
