// src/pages/Tutor/MySchedule/SessionCard.jsx
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Video,
  FileText,
  XCircle,
  Star,
} from "lucide-react";

export default function SessionCard({
  session,
  isPast,
  onCancel,
  onReport,
}) {
  console.log('session card: ' + Object.keys(session.report).length);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-4 border-l-4 border-[#00274d]">
      {/* Tiêu đề + trạng thái */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            {session.title || "Buổi học không tên"}
          </h3>
        </div>
        <div>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              session.status === "completed"
                ? "bg-emerald-100 text-emerald-700"
                : session.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {session.status === "completed"
              ? "Hoàn thành"
              : session.status === "cancelled"
              ? "Đã hủy"
              : "Sắp diễn ra"}
          </span>
        </div>
      </div>

      {/* Thông tin chi tiết */}
      <div className="mb-4 text-sm text-slate-700 mt-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center text-sm gap-2">
            <User className="text-blue-500" size={16} />
            <span>{session.studentName || "Học viên ẩn danh"}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-blue-500" />
            {session.date}
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} className="text-blue-500" />
            <span>{session.time}</span>
          </div>

          <div className="flex items-center gap-2">
            {session.type === "online" ? (
              <>
                <Video size={16} className="text-blue-500" />
                <span>Online</span>
              </>
            ) : (
              <>
                <MapPin size={16} className="text-blue-500" />
                <span>{session.location}</span>
              </>
            )}
          </div>

          {/* Đánh giá */}
          <div className="flex items-center gap-2 mt-1">
            {session.rating === 0 ? (
              <span className="text-green-600 text-sm italic">
                Chưa có đánh giá
              </span>
            ) : (
              <div className="flex items-center gap-1 text-green-700 font-medium">
                <Star
                  size={16}
                  className="text-yellow-400"
                  fill="gold"
                  stroke="gold"
                />
                <span>{session.rating}/5</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hành động */}
      <div className="flex flex-wrap gap-2">
        {!isPast ? (
          <>
            {/* Hủy lịch */}
            <button
              onClick={() => onCancel(session)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
            >
              <XCircle size={16} /> Hủy lịch
            </button>

            {/* Tham gia (chỉ online) */}
            {session.type === "online" && (
              <a
                href={session.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition"
              >
                <Video size={16} /> Tham gia
              </a>
            )}
          </>
        ) : (
          <>
            {/* Biên bản buổi học */}
            <button
              onClick={() => onReport(session)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-amber-400 hover:bg-amber-500 text-slate-800 text-sm font-medium transition"
            >
              <FileText size={16} />
              {Object.keys(session.report).length === 0
                ? "Tạo biên bản buổi học"
                : "Xem biên bản buổi học"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
