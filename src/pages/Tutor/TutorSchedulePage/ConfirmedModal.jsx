import { X, XCircle } from "lucide-react";
import { useState } from "react";
import CancelModal from "../../../components/CancelModal";

export default function ConfirmedModal({ slot, day, date, onClose }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [warning, setWarning] = useState(false);
  const [superWarning, setSuperWarning] = useState(false);

  function handleCancel() {
    const now = new Date();
    const formatted = now.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    if (formatted === date) {
      const startTime = slot.time.split(" - ")[0];
      const [hours, minutes] = startTime.split(":").map(Number);
      const startDateTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      );

      const minuteDiff = (startDateTime - now) / 1000 / 60;

      if (minuteDiff <= 0) {
        setSuperWarning(true);
      } else if (minuteDiff <= 60) {
        setWarning(true);
      }
    }
    setShowCancelModal(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      {!showCancelModal && <div className="bg-white rounded-2xl p-6 max-w-md w-[92%] relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={22} />
        </button>
        <h3 className="text-lg font-semibold text-slate-800 mb-3">
          Lịch đã xác nhận
        </h3>
        <div className="mb-4 bg-gray-50 p-3 rounded-md border border-gray-100 text-sm">
          <p>
            <strong>Học viên:</strong> {slot.studentName}
          </p>
          <p>
            <strong>Tên buổi học:</strong> {slot.title}
          </p>
          <p className="mt-2">
            <strong>Thời gian:</strong> {day}, {date} — {slot.time}
          </p>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-slate-700 rounded-md hover:bg-gray-200"
          >
            Đóng
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2"
          >
            <XCircle size={18} /> Hủy lịch
          </button>
        </div>
      </div>}
      <CancelModal
        slot={slot}
        open={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setWarning(false);
          setSuperWarning(false);
          onClose();
        }}
        isWarning={warning}
        isSuperWarning={superWarning}
      />
    </div>
  );
}
