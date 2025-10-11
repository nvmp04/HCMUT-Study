import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../hooks/useAuth";

const socket = io("http://localhost:5000");

function NotificationModal() {
  const queryClient = useQueryClient();
  const [notifiModal, setNotifiModal] = useState(false);
  const [data, setData] = useState({});
  const [type, setType] = useState("");

  const { auth } = useAuth();
  const { role } = auth;
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    if (!socket || !role) return;
    const events =
      role === "student"
        ? ["appointment-updated", "decline"]
        : ["booksession", "studentcancel"];

    function handleStudentEvent({ slotId, name, studentId, reason, type }) {
      if (id !== studentId) return;
      setData({ slotId, name, reason });
      setType(type);
      setNotifiModal(true);
    }

    function handleTutorEvent({ slotId, name, tutorId, reason, type }) {
      if (id !== tutorId) return;
      setData({ slotId, name, reason });
      setType(type);
      setNotifiModal(true);
    }

    const handler = role === "student" ? handleStudentEvent : handleTutorEvent;
    events.forEach((e) => socket.on(e, handler));

    return () => {
      events.forEach((e) => socket.off(e, handler));
    };
  }, [socket, role, id, queryClient]);

  if (!notifiModal) return null;

  const modalStyle = {
    accepted: {
      border: "border-green-500",
      text: "text-green-600",
      title: "Giảng viên đã chấp nhận lịch học!",
      bg: "bg-green-600 hover:bg-green-700"
    },
    cancelled: {
      border: "border-red-500",
      text: "text-red-600",
      title: "Buổi học đã bị hủy!",
      bg: "bg-red-600 hover:bg-red-700",
    },
    declined: {
      border: "border-yellow-400",
      text: "text-yellow-600",
      title: "Giảng viên đã từ chối lịch học.",
      bg: "bg-yellow-500 hover:bg-yellow-600",
    },
    booked: {
      border: "border-green-500",
      text: "text-teal-600",
      title: "Thông báo",
      bg: "bg-green-600 hover:bg-green-700"
    },
  }[type || "accepted"];

  const showReason = type === "cancelled" || type === "declined";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-100">
      <div
        className={`bg-white rounded-2xl p-6 max-w-[420px] w-[90%] text-center shadow-lg border-2 ${modalStyle.border}`}
      >
        <h3 className={`text-xl font-semibold mb-4 ${modalStyle.text}`}>
          {modalStyle.title}
        </h3>

        <p className="text-gray-700 mb-4">
          {type === "accepted" ? (
            <>
              Bạn đã được xác nhận lịch học từ giảng viên{" "}
              <strong className="text-gray-900">{data.name}</strong> <br />
              Vào lúc: <strong className="text-gray-900">{data.slotId}</strong>
            </>
          ) : type === "booked" ? (
            <>
              Bạn có yêu cầu đặt lịch mới từ{" "}
              <strong className="text-gray-900">{data.name}</strong> <br />
              Thời gian:{" "}
              <strong className="text-gray-900">{data.slotId}</strong>
            </>
          ) : type === "cancelled" ? (
            <>
              Buổi học với{" "}
              <strong className="text-gray-900">{data.name}</strong> <br />
              Vào lúc:{" "}
              <strong className="text-gray-900">{data.slotId}</strong> đã bị hủy.
            </>
          ) : (
            <>
              Buổi học với{" "}
              <strong className="text-gray-900">{data.name}</strong> <br />
              Vào lúc:{" "}
              <strong className="text-gray-900">{data.slotId}</strong>{" "}
              {type === "declined" ? "đã bị từ chối." : ""}
            </>
          )}
        </p>

        {showReason && data.reason && (
          <div
            className={`${
              type === "declined"
                ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                : "bg-red-50 border-red-200 text-red-700"
            } border rounded-lg p-3 text-sm mb-5`}
          >
            <strong>Lý do: </strong> {data.reason}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={() => setNotifiModal(false)}
            className={`px-5 py-2 rounded-lg font-medium text-white transition-colors ${modalStyle.bg}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
export default NotificationModal;
