import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";

export default function CancelWarning({ info, onClose, setWarning }) {
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reason.trim().length < 5) {
      alert("Vui lòng nhập lý do hủy lịch chi tiết hơn.");
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl max-w-md w-[90%] relative shadow-lg">
        {/* Nút X để đóng */}
        <button
          onClick={()=>{
            onClose();
            setWarning(false);
          }
          }
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={24} className="text-red-500" />
          <h2 className="text-lg font-semibold text-red-600">
            Hủy lịch quá sát giờ!
          </h2>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          Buổi học sẽ diễn ra trong vòng <strong>1 giờ</strong>. Hãy liên hệ học viên để thông báo.
        </p>

        <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-5 text-sm">
          <p>
            <strong>Tên học viên:</strong> {info.studentName}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {info.phone}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lý do hủy lịch
            </label>
            <textarea
              rows="4"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Nhập lý do hủy buổi học..."
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 hover:bg-gray-300"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Gửi lý do & Hủy lịch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
