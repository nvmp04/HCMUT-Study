import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export default function ReportModal({ open, onClose, session, onSubmit }) {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const { role } = auth || {};
  const [report, setReport] = useState({
    attendance: "present",
    summary: "",
    homework: "",
    notes: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.report && Object.keys(session.report).length > 0) {
      setReport(session.report);
    } else {
      setReport({
        attendance: "present",
        summary: "",
        homework: "",
        notes: "",
      });
    }
  }, [session]);

  if (!open) return null;

  const isViewMode = session?.report && Object.keys(session.report).length > 0;
  const isStudent = role === "student";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport((prev) => ({ ...prev, [name]: value }));
    if (name === "notes" && value.trim() !== "") setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (report.notes.trim() === "") {
      setError("Vui lòng nhập nhận xét trước khi lưu.");
      return;
    }
    onSubmit({ ...report, sessionId: session?._id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl border border-blue-200 w-full max-w-3xl shadow-lg animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-blue-100">
          <h2 className="text-lg font-semibold text-slate-800">
            {isStudent
              ? "Biên bản buổi học"
              : isViewMode
              ? "Xem biên bản buổi học"
              : "Biên bản buổi học"}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition text-xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Nội dung */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5 space-y-6 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-transparent">
          {/* Thông tin buổi học */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-slate-700">
            <p>
              <span className="font-medium">Học viên:</span>{" "}
              {session?.studentName || "Không xác định"}
            </p>
            <p>
              <span className="font-medium">Thời gian:</span> {session?.date}
            </p>
          </div>

          {/* Nếu role là student */}
          {isStudent ? (
            <>
              {isViewMode ? (
                <div className="space-y-5 text-slate-700">
                  <div>
                    <p className="font-medium text-slate-800">
                      Tình trạng tham gia:
                    </p>
                    <p className="mt-1">
                      {session.report.attendance === "present"
                        ? "Có mặt"
                        : session.report.attendance === "late"
                        ? "Đến trễ"
                        : "Vắng mặt"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      Tóm tắt nội dung buổi học:
                    </p>
                    <p className="mt-1 whitespace-pre-line">
                      {session.report.summary || "Không có nội dung"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      Bài tập / nhiệm vụ giao:
                    </p>
                    <p className="mt-1 whitespace-pre-line">
                      {session.report.homework || "Không có bài tập"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Nhận xét:</p>
                    <p className="mt-1 whitespace-pre-line">
                      {session.report.notes || "Không có nhận xét"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500 py-8 italic">
                  Chưa cập nhật biên bản
                </div>
              )}
            </>
          ) : (
            // Nếu là tutor → vẫn giữ logic cũ
            <>
              {isViewMode ? (
                <div className="space-y-5 text-slate-700">
                  <div>
                    <p className="font-medium text-slate-800">
                      Tình trạng tham gia:
                    </p>
                    <p className="mt-1">
                      {session.report.attendance === "present"
                        ? "Có mặt"
                        : session.report.attendance === "late"
                        ? "Đến trễ"
                        : "Vắng mặt"}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      Tóm tắt nội dung buổi học:
                    </p>
                    <p className="mt-1 whitespace-pre-line">
                      {session.report.summary}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      Bài tập / nhiệm vụ giao:
                    </p>
                    <p className="mt-1 whitespace-pre-line">
                      {session.report.homework}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">Nhận xét:</p>
                    <p className="mt-1 whitespace-pre-line">
                      {session.report.notes}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Tình trạng tham gia:
                    </label>
                    <select
                      name="attendance"
                      value={report.attendance}
                      onChange={handleChange}
                      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-slate-700 focus:ring-2 focus:ring-blue-400 outline-none"
                    >
                      <option value="present">Có mặt</option>
                      <option value="late">Đến trễ</option>
                      <option value="absent">Vắng mặt</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-2">
                      Tóm tắt nội dung buổi học:
                    </label>
                    <textarea
                      name="summary"
                      rows={3}
                      value={report.summary}
                      onChange={handleChange}
                      placeholder="Nhập tóm tắt ngắn gọn về buổi học..."
                      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-slate-700 focus:ring-2 focus:ring-blue-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-2">
                      Bài tập / nhiệm vụ giao:
                    </label>
                    <textarea
                      name="homework"
                      rows={2}
                      value={report.homework}
                      onChange={handleChange}
                      placeholder="Ghi bài tập hoặc nhiệm vụ (nếu có)..."
                      className="w-full border border-blue-200 rounded-lg px-3 py-2 text-slate-700 focus:ring-2 focus:ring-blue-300 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-2">
                      Nhận xét: <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={report.notes}
                      onChange={handleChange}
                      placeholder="Nhận xét về tiến độ học tập của học viên"
                      className={`w-full border rounded-lg px-3 py-2 text-slate-700 focus:ring-2 outline-none ${
                        error
                          ? "border-red-400 focus:ring-red-300"
                          : "border-blue-200 focus:ring-blue-300"
                      }`}
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-blue-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            Đóng
          </button>

          {!isStudent && !isViewMode && (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Lưu biên bản
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
