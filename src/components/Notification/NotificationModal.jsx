import { useEffect, useState } from "react";
import { useAuth } from "../../features/auth/hooks/useAuth";
import { useSocket } from "../../features/websocket/hooks/useSocket";

const modalStyles = {
  accepted: {
    text: "text-green-600",
    title: "Giảng viên đã chấp nhận lịch học!",
    bg: "bg-green-600 hover:bg-green-700",
  },
  cancelled: {
    text: "text-red-600",
    title: "Buổi học đã bị hủy!",
    bg: "bg-red-600 hover:bg-red-700",
  },
  declined: {
    text: "text-yellow-600",
    title: "Giảng viên đã từ chối lịch học.",
    bg: "bg-yellow-500 hover:bg-yellow-600",
  },
  booked: {
    text: "text-teal-600",
    title: "Thông báo đặt lịch mới!",
    bg: "bg-green-600 hover:bg-green-700",
  },
};


function NotificationModal() {
  const [notifiModal, setNotifiModal] = useState(false);
  const [data, setData] = useState({});
  const [type, setType] = useState("");
  const{ socket} = useSocket();
  const { auth } = useAuth();
  const { role } = auth;
  const id = sessionStorage.getItem("id");
  
  useEffect(() => {
    if (!role || !socket) return;
    const events =
      role === "student"
        ? ["appointment-updated", "decline"]
        : ["booksession", "studentcancel"];

    function handleStudentEvent({ title, slotId, name, studentId, reason, type }) {
      if (id !== studentId) return;
      setData({ slotId, name, reason });
      setType(type);
      setNotifiModal(true);
    }
    function handleTutorEvent({ title, slotId, name, tutorId, reason, type }) {
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
  }, [role, id, socket]);

  if (!notifiModal) return null;

  const style = modalStyles[type] || modalStyles.accepted;
  const showReason = type === "cancelled" || type === "declined";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100]">
      <div
        className={`bg-white rounded-2xl p-6 max-w-[420px] w-[90%] text-center shadow-lg `}
      >
        <h3 className={`text-xl font-semibold mb-4 ${style.text}`}>
          {style.title}
        </h3>

        <p className="text-gray-700 mb-4">
          {type === "accepted" ? (
            <>
              Bạn đã được xác nhận lịch học từ giảng viên{" "}
              <strong>{data.name}</strong> <br />
              Vào lúc: <strong>{data.slotId}</strong>
            </>
          ) : type === "booked" ? (
            <>
              Bạn có yêu cầu đặt lịch mới từ{" "}
              <strong>{data.name}</strong> <br />
              Thời gian: <strong>{data.slotId}</strong>
            </>
          ) : type === "cancelled" ? (
            <>
              Buổi học với <strong>{data.name}</strong> <br />
              Vào lúc <strong>{data.slotId}</strong> đã bị hủy.
            </>
          ) : (
            <>
              Buổi học với <strong>{data.name}</strong> <br />
              Vào lúc <strong>{data.slotId}</strong>{" "}
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

        <button
          onClick={() => setNotifiModal(false)}
          className={`px-5 py-2 rounded-lg font-medium text-white transition-colors ${style.bg}`}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default NotificationModal;
