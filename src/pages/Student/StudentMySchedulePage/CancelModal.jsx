import React, { useState } from "react";
import { fetchAPI } from "../../../utils/fetchAPI";
import { useQueryClient } from "@tanstack/react-query";

export default function CancelModal({ slot, open, session, onClose}) {
  const [reason, setReason] = useState("");
  const queryClient = useQueryClient();
  if (!open) return null;

  async function handleSubmit (){
    if (reason.trim()) {
      console.log(slot)
      const content = {status:'cancelled', slotId: slot.slotId, reason};
      const url = 'http://localhost:5000/student/cancelled';
      await fetchAPI(url, 'PUT', content, true);
      queryClient.invalidateQueries(['studentschedule']);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold text-slate-800 mb-2">
          Hủy buổi học
        </h2>
        <p className="text-sm text-slate-600">
          Bạn có chắc chắn muốn hủy buổi học {' '}
          <span className="font-medium text-slate-800">
            {slot.title}
          </span>?
        </p>

        <textarea
          className="w-full border rounded-md p-2 text-sm mb-4 mt-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          placeholder="Nhập lý do hủy (bắt buộc)..."
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
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
