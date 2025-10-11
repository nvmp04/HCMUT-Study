import React, { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "../utils/fetchAPI";
import { useAuth } from "../hooks/useAuth";

export default function CancelModal({
  slot,
  open,
  onClose,
  isWarning = false,
  isSuperWarning = false,
}) {
  const [reason, setReason] = useState("");
  const queryClient = useQueryClient();

  const { auth } = useAuth();
  const { role } = auth;
  if (!open) return null;
  async function handleSubmit() {
    if (!reason.trim()) return;

    const content = { status: "cancelled", slotId: slot.slotId, reason };

    const url =
      role === "tutor"
        ? "http://localhost:5000/tutor/response"
        : "http://localhost:5000/student/cancelled";

    await fetchAPI(url, "PUT", content, true);
    queryClient.invalidateQueries([
      role === "tutor" ? "schedule" : "studentschedule",
    ]);
    setReason('');
    onClose();
  }
  if (isSuperWarning) {
    const phone =
      role === "tutor" ? slot.studentPhone : slot.tutorPhone;
    const name =
      role === "tutor" ? slot.studentName : slot.tutorName;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg border-4 border-red-600 text-center relative">
          <AlertTriangle
            size={60}
            className="text-red-600 mx-auto mb-4 animate-pulse"
          />
          <h2 className="text-2xl font-bold text-red-700 mb-3">
            Buổi học đang diễn ra!
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Vui lòng liên hệ{" "}
            <strong>{role === "tutor" ? "học viên" : "giảng viên"}</strong>:{" "}
            <strong>{name}</strong> — <span>{phone}</span>
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    );
  }
  const otherRole = role === "tutor" ? "học viên" : "giảng viên";
  const otherName =
    role === "tutor" ? slot.studentName : slot.tutorName;
  const otherPhone =
    role === "tutor" ? slot.studentPhone : slot.tutorPhone;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        {/* Tiêu đề */}
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Hủy buổi học
        </h2>

        {/* Cảnh báo nếu hủy quá sát giờ */}
        {isWarning && (
          <div className="flex items-center gap-2 mb-2 text-red-600">
            <AlertTriangle size={22} />
            <h3 className="font-medium">Hủy lịch quá sát giờ!</h3>
          </div>
        )}
        {isWarning ? (
          <>
            <p className="text-sm text-slate-600 mb-3">
            Buổi học sẽ diễn ra trong vòng <strong>1 giờ</strong>.  
            Hãy liên hệ {otherRole} để thông báo.
            </p>
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4 text-sm">
            <p>
                <strong>Tên {otherRole}:</strong> {otherName}
            </p>
            <p>
                <strong>Số điện thoại:</strong> {otherPhone}
            </p>
            </div>
          </>
        ) : (
        <p className="text-sm text-slate-600 mb-3">
            Bạn có chắc chắn muốn hủy buổi học{" "}
            <span className="font-medium text-slate-800">{slot.title}</span> với {otherRole} <strong>{otherName}</strong>
        </p>
        )}
        <textarea
          className="w-full border rounded-md p-2 text-sm mb-4 mt-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Nhập lý do hủy (bắt buộc)..."
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200"
          >
            Đóng
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reason.trim()}
            className={`px-4 py-2 rounded-md text-sm text-white ${
              reason.trim()
                ? "bg-red-500 hover:bg-red-600"
                : "bg-red-300 cursor-not-allowed"
            }`}
          >
            Xác nhận hủy
          </button>
        </div>
      </div>
    </div>
  );
}
