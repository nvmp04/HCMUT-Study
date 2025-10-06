import React, { useState } from "react";
import SessionCard from "./SessionCard";
import CancelModal from "./CancelModal";
import RescheduleModal from "./RescheduleModal";
import FeedbackModal from "./FeedbackModal";

const dummySessions = [
  {
    id: 1,
    subject: "Toán đại cương",
    tutor: "Nguyễn Văn A",
    date: "2025-10-10",
    time: "15:00 - 17:00",
    type: "online",
    location: "Zoom Meeting",
    status: "confirmed",
    hasFeedback: false,
    hasMinutes: true,
  },
  {
    id: 2,
    subject: "Quản trị mạng",
    tutor: "Trần Thị B",
    date: "2025-09-01",
    time: "09:00 - 11:00",
    type: "offline",
    location: "Thư viện Đại học",
    status: "completed",
    hasFeedback: true,
    myRating: 5,
    hasMinutes: true,
  },
  {
    id: 3,
    subject: "Hóa học - Luyện thi",
    tutor: "Phạm Văn C",
    date: "2025-10-2",
    time: "13:00 - 15:00",
    type: "online",
    location: "Google Meet",
    status: "pending",
  },
];

export default function StudentMySchedulePage() {
  const [tab, setTab] = useState("upcoming"); 
  const [selectedSession, setSelectedSession] = useState(null);
  const [cancelModal, setCancelModal] = useState(false);
  const [rescheduleModal, setRescheduleModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);

  const filteredSessions = dummySessions.filter((s) => {
    const now = new Date();
    const sessionDate = new Date(s.date);

    if (tab === "upcoming") return sessionDate >= now && s.status !== "cancelled_before_start";
    if (tab === "past") return sessionDate < now || s.status === "completed";
    if (tab === "cancelled") return s.status === "cancelled_before_start";
    return true;
  });

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
      {/* Tiêu đề */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Lịch học của tôi</h1>
        <p className="text-sm text-slate-500">Xem và quản lý các buổi học của bạn</p>
      </div>

      {/* Tabs */}
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

      {/* Danh sách buổi học */}
      <div>
        {filteredSessions.length === 0 ? (
          <div className="text-center text-slate-500 py-10">
            Không có buổi học nào trong mục này 
          </div>
        ) : (
          filteredSessions.map((session) => {
            const isPast = new Date(session.date) < new Date();
            const isFailed =
              session.status === "rejected" ||
              session.status === "cancelled_before_start" ||
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
