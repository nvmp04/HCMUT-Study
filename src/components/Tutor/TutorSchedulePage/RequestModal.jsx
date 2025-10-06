import { useState } from "react";
import { X, XCircle, CheckCircle } from "lucide-react";

export default function RequestModal({ slot, day, date, onClose, onAccept, onDecline }) {
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 max-w-md w-[92%] relative">
        {/* nút X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition"
        >
          <X size={22} />
        </button>

        <h3 className="text-lg font-semibold text-slate-800 mb-3">Yêu cầu đặt lịch</h3>

        <div className="mb-4 bg-gray-50 p-3 rounded-md border border-gray-100">
          <p className="text-sm"><strong>Học viên:</strong> {slot.request?.studentName}</p>
          <p className="text-sm"><strong>Tên buổi học:</strong> {slot.request?.subjectName}</p>
          <p className="text-sm"><strong>Ghi chú:</strong> {slot.request?.note || "—"}</p>
          <p className="text-sm mt-2"><strong>Thời gian:</strong> {day}, {date} — {slot.time}</p>
        </div>

        {/* Nếu tutor chọn từ chối, hiển thị form nhập lý do */}
        {showDeclineForm && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Lý do từ chối:
            </label>
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              rows={3}
              className="w-full border rounded-md p-2 text-sm focus:ring focus:ring-red-200"
              placeholder="Nhập lý do từ chối..."
            ></textarea>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-9 py-2 rounded-md bg-gray-100 text-slate-700 hover:bg-gray-200"
          >
            Đóng
          </button>

          {!showDeclineForm ? (
            <button
              onClick={() => setShowDeclineForm(true)}
              className="px-4 py-2 rounded-md bg-red-400 text-white hover:bg-red-500 flex items-center gap-2"
            >
              <XCircle size={18} /> Từ chối
            </button>
          ) : (
            <button
              onClick={() => {
                if (!declineReason.trim()) return alert("Vui lòng nhập lý do từ chối!");
                onDecline(declineReason);
              }}
              className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 flex items-center gap-2"
            >
              <XCircle size={18} /> Xác nhận từ chối
            </button>
          )}

          <button
            onClick={onAccept}
            className="px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600 flex items-center gap-2"
          >
            <CheckCircle size={18} /> Chấp nhận
          </button>
        </div>
      </div>
    </div>
  );
}
